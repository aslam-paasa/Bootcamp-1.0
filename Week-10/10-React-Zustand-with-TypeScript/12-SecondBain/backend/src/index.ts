/**
 * Second Brain App Backend:
 * - In our final project, we'll be putting links in our second brain. But
 *   the issue is the knowledge base becomes too big.
 * - Now the user comes to the app, and try to query the knowledge base:
 *   "What is trumps stance on h1b visas - twitter".
 * - Among the 1000s of links, we are looking for the above twitter link.
 * - When we query our knowledge with "What is trumps stance on h1b visas - 
 *   twitter". Ab http server ko kuch nhi pta, but it can forward it to 
 *   LLM and the LLM will return something. But should we forward it to 
 *   GPTs or add some context to the query? First we'll add some context to
 *   the query and then forward it to LLM, and that is what our backend
 *   needs to do, and forward the response. 
*/

/**
 * How do we find relevant links?
 * - Vector DB is a special database that stores text as numbers (vectors),
 *   while embeddings means converting text into numerical vectors.
 *   Ex: Converting "cat" to [0.2, 0.5, 0.1]
 * 
 * - When searching, the query is also converted to numbers. Vector DB then
 *   finds and returns text with similar number patterns, enabling semantic search.
 * 
 * - How "cat" and "kitten" have similar context:
 *   - Both refer to small felines
 *   - Both are pets
 *   - Often appear together in training data
 *     Example: "The cat had kittens", "Kittens grow up to be cats"
 *   - Share similar surrounding words like "meow", "purr", "milk"
 *   - Described with similar behaviors and traits
 * 
 * - AI models learn these patterns during training. When converting to vectors:
 *   "cat" -> [0.2, 0.5, 0.1, 0.7, 0.3]  
 *   "kitten" -> [0.19, 0.48, 0.12, 0.71, 0.28]
 *   The vectors end up being very similar
 * 
 * - Vector DB uses mathematical formulas like "cosine similarity" to measure
 *   vector similarity. High similarity scores indicate related content that
 *   gets returned.
 * 
 * - So, when similar things are talked about, their vectors are very similar.
 *   And when we search for a query, we find the most similar vectors.
*/

import express from "express";
import { random } from "./utils";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

/**
 * 1. User Signup
 *    POST /api/v1/signup
 *    Request Body:
 *      {
 *        "username": "John Doe",
 *        "password": "password"
 *      }
 *    Response Body:
 *      {
 *        "message": "User signed up"
 *      }
*/
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await UserModel.create({
            username: username,
            password: password
        });

        res.json({
            message: "User signed up"
        });
    } catch (e) {
        res.status(411).json({ message: "User already exists" });
    }
});

/**
 * 2. User Signin
 *    POST /api/v1/signin
 *    Request Body:
 *      {
 *        "username": "John Doe",
 *        "password": "password"
 *      }
 *    Response Body:
 *      {
 *        "message": "User signed in"
 *      }
*/
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({
        username,
        password
    });

    if (existingUser) {
        const token = jwt.sign(
            { id: existingUser._id },
            JWT_PASSWORD
        );

        res.json(
            {
                token,
                message: "User signed in"
            });
    } else {
        res.status(403).json({ message: "Incorrect credentials" });
    }
});

/**
 * 3. Add Content
 *    POST /api/v1/content
 *    Request Body:
 *      {
 *        "title": "notion doc about trump",
 *        "link": "google.com/trump.pdf",
 *      }
 *    Request Header:
 *      {
 *        "Authorization": <token>
 *      }
 *    Response Body:
 *      {
 *        "message": "Content added"
 *      }
*/
app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        title: req.body.title,
        userId: req.userId,
        tags: []
    });

    res.json({ message: "Content added" });
});

/**
 * 4. Fetch all existing content (no pagination)
 *    GET /api/v1/content
 *    Request Header:
 *      {
 *        "Authorization": <token>
 *      }
 *    Response Body:
 *      {
 *        "content": [
 *          {
 *            "link": "https://example.com",
 *            "type": "article",
 *            "title": "Example Title"
 *            "userId": {
 *              "username": "John Doe"
 *              "userId": "123"
 *            }
 *          }
 *        ]
 *      }
 * 
 * Note: populate will return the following:
 *       a. username of the user who added the content
 *       b. userId of the user who added the content 
 * 
 * 
*/
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    const userId = req.userId;

    const content = await ContentModel.find(
        { userId: userId }).populate("userId", "username"
        );

    res.json({
        content: content
    });
});

/**
 * 5. Delete User Content
 *    DELETE /api/v1/content
 *    Request Body:
 *      {
 *        "contentId": "123"
 *      }
 *    Response Body:
 *      {
 *        "message": "Deleted"
 *      }
*/
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    });

    res.json({ message: "Deleted" });
});

/**
 * 6. Share Content Link
 *    POST /api/v1/brain/share
 *    Request Body:
 *      {
 *        "share": true
 *        "hash": "123"
 *      }
 *    Response Body:
 *      {
 *        "hash": "123"
 *        "message": "Added link"
 *      }
*/
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;

    /**
     * If share is true, we will create a new link:
     * a. If link already exists, we will return the hash
     * b. If link doesn't exist, we will create a new link
    */
    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({ hash: existingLink.hash });
            return;
        }

        const hash = random(10);
        await LinkModel.create({ 
            userId: req.userId, 
            hash: hash 
        });

        res.json({ hash });
    } else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Removed link" });
    }
});

/**
 * 7. Get Shared Content
 *    GET /api/v1/brain/:shareLink
 *    Request Body:
 *      {
 *        "shareLink": "123"
 *      }
 *    Response Body:
 *      {
 *        "username": "John Doe",
 *        "content": [
 *          {
 *            "link": "https://example.com",
 *            "type": "article",
 *            "title": "Example Title"
 *          }
 *        ]
 *      }
*/
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;

    /**
     * First, db will find the link with the hash:
    */
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" });
        return;
    }

    /**
     * Then, db will find all content for the user who shared the link:
    */
    const content = await ContentModel.find({ userId: link.userId });
    console.log(content);

    /**
     * Then, db will find the user who shared the link:
    */
    const user = await UserModel.findOne({ _id: link.userId });

    /**
     * We have done 3 db calls, but if user doesn't exist, we will return 404.
    */
    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.json({
        username: user.username,
        content: content
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});