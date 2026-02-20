const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
const z = require("zod");

const adminSchema = z.object({
  username: z.string(),
  password: z.string().min(4).max(100),
});

const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
    imageLink: z.string(),
});

/**
 * Admin Routes: 
 * 1. Implement admin signup logic
 * 2. Implement course creation logic
 * 3. Implement fetching all courses logic
*/


/**
 * Implement admin signup logic:  
*/
router.post("/signup", async (req, res) => {
  
  const zodResponse = adminSchema.safeParse(req.body);
  if (zodResponse.data) {
    try {
      const response = await Admin.create(req.body);
      res.status(201).json({ message: 'Admin created successfully', response })
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).send("Invalid input");
  }
});


/**
 * Implement course creation logic
*/
router.post("/courses", adminMiddleware, async (req, res) => {

  const zodResponse = courseSchema.safeParse(req.body);
  if(zodResponse.data){
    try {
        const response = await Course.create(req.body);
        res.status(201).json({ message: 'Course created successfully', response })
    } catch (error) {
        console.log(error);
    }
  } else{
    res.status(400).send("Invalid input");
  }

});


/**
 * Implement fetching all courses logic
*/
router.get("/courses", adminMiddleware, async (req, res) => {

  try {
    const response = await Course.find();
    res.status(200).json({ message: 'Courses fetched successfully', response })
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
