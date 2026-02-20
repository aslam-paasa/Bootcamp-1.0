const router = require("express").Router();
const Movie = require("../models/Movie");
const movies = require("../config/movies.json");

/**
 * We will learn:
 * 1. Pagination
 * 2. Filtering
 * 3. Sorting
 * 4. Searching
*/

/**
 * 
 * Query Parameters with Examples:
 * 1. Pagination:
 *    a. page: 
 *       > It is break down the data into smaller chunks.
 *       > Define page variable and assign page number we receive from query,
 *         and subtract it by 1 so it can be used as 0-based index.
 *       > If page number is not provided, default page is 0.
 *         const page = parseInt(req.query.page) - 1 || 0;
 *    b. limit:
 *       > It is used to limit the number of movies per page.
 *       > Define limit variable and assign limit number we receive from query.
 *       > If limit number is not provided, default limit is 5.
 *         const limit = parseInt(req.query.limit) || 5;
 * 
 * 2. Searching:
 *    > It is used to search a specific data.
 *    > Define search variable and assign search query we receive from query.
 *    > If search query is not provided, default search query is "".
 *      const search = req.query.search || "";
 * 
 * 
 * 3. Filtering:
 *    > It is used to filter the data.
 *    > Define genre variable and assign genre query we receive from query.
 *    > If genre query is not provided, default genre query is "All".
 *      const genre = req.query.genre || "All";
 * 
 *    > Now in order to filter movie by genre, we need all genre we have in
 *      our database. genreOptions is just a demo, means we are doing here
 *      manually in an array.
 * 
 *		const genreOptions = [
 *			"Action",
 *			"Romance",
 *			"Fantasy",
 *			"Drama",
 *			"Crime",
 *			"Adventure",
 *			"Thriller",
 *			"Sci-fi",
 *			"Music",
 *			"Family",
 *		];
 * 
 *    > Genre filter kaise kaam karta hai:
 *      - Agar genre "All" hai: saare genres select ho jaate hain 
 *        (genreOptions array se)
 *      - Agar specific genres hain (jaise "Action,Drama"): comma se split 
 *        karke array banate hain
 * 
 *      const genre = req.query.genre || "All"
 *        ? (genre = [...genreOptions])           // Saare genres select
 *        : (genre = req.query.genre.split(",")); // Specific genres ko split
 * 
 * 4. Sorting:
 *    > It is used to sort the data.
 *    > Define sort variable and assign sort query we receive from query.
 *    > If sort query is not provided, default sort query is "rating".
 *      const sort = req.query.sort || "rating";
 * 
 *    > Sorting kaise kaam karta hai (Step by Step):
 *
 *    Step 1: Default Value Set Karna
 *    - Agar user ne koi sort query nahi di, toh by default "rating" ke basis
 *      pe sort karenge
 *    - Example: const sort = req.query.sort || "rating";
 *
 *    Step 2: Sort Query ko Array Mein Convert Karna  
 *    - Agar user ne sort query di hai (like "year,desc"):
 *      > Comma se split karke array bana denge: ["year", "desc"]
 *    - Agar sort query nahi di:
 *      > Default value ko array mein daal denge: [sort] => ["rating"]
 *    
 *    Code Example:
 *      const sort = req.query.sort || "rating";
 *      req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
 *
 *    Step 3: sortBy Object Banana
 *    - Ek khali object banayenge: let sortBy = {}
 *    - Ab 2 cases ho sakte hain:
 *
 *      Case 1: User ne order specify kiya hai
 *      - Jaise: ["year", "desc"] ya ["rating", "asc"]
 *      - Tab sortBy object mein dono values daal denge
 *      - Example: sortBy = { year: "desc" }
 *
 *      Case 2: User ne sirf field di hai
 *      - Jaise: ["rating"] ya ["year"]
 *      - Tab by default "asc" (ascending) order use karenge
 *      - Example: sortBy = { rating: "asc" }
 *
 *    Final Code:
 *      let sortBy = {};
 *      if (sort[1]) {
 *          sortBy[sort[0]] = sort[1];  // User ne order specify kiya hai
 *      } else {
 *          sortBy[sort[0]] = "asc";    // Default ascending order
 *      }
 *
 *    Note: Ye sortBy object finally MongoDB ke sort() function mein use hoga
 *    jisse movies ko sahi order mein arrange kar sake
 * 
 * 5. Combined Example:
 *    > Saare query parameters ko combine karke use karne ka tarika
 *    > Data flow step by step samajhte hain:
 *    
 *    Step 1: Search Query (First Filter)
 *    - Sabse pehle name field mein search karta hai
 *    - Maan lo search="dark" hai:
 *      > Saare 14 movies mein se sirf "The Dark Knight" match karega
 *      > Data: 14 -> 1 movie
 * 
 *    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
 *    
 *    Step 2: Genre Filter (Second Filter) 
 *    - Search ke baad bache movies mein se genre filter karta hai
 *    - Genre filter ko step by step samajhte hain:
 *      
 *      a. Input ka flow:
 *         URL example: /movies?genre=Action,Drama
 *         req.query.genre = "Action,Drama"
 *         genre array = ["Action", "Drama"]
 *      
 *      b. where() operator ka use:
 *         .where("genre") ka matlab:
 *         - MongoDB ko batata hai ki "genre" field par filter lagana hai
 *         - Ye database ko kehta hai "genre" field ko target karo
 *         Example: 
 *         > Jaise SQL mein "WHERE genre = ..." likhte hain
 *         > Waise hi MongoDB mein .where("genre") use karte hain
 *      
 *      c. in() operator kaise kaam karta hai:
 *         - Ye array values ko match karta hai
 *         - Movie ka data kuch aisa hota hai:
 *           {
 *             name: "Dark Knight",
 *             genre: ["Action", "Adventure"]
 *           }
 *         
 *         - in([...genre]) check karta hai:
 *           Input: ["Action", "Drama"]
 *           Database mein har movie ke liye:
 *           > Dark Knight: ["Action", "Adventure"] 
 *             - "Action" match hua ✓ - Select hoga
 *           > Titanic: ["Romance", "Drama"]
 *             - "Drama" match hua ✓ - Select hoga
 *           > Matrix: ["Sci-fi", "Action"]
 *             - "Action" match hua ✓ - Select hoga
 *           > Inception: ["Sci-fi", "Thriller"]
 *             - Koi match nahi ✗ - Reject hoga
 *      
 *      d. Combined query ka matlab:
 *         .where("genre").in([...genre])
 *         = "genre field mein check karo, kya input array ki koi value match karti hai?"
 *         = "Select those movies where any genre matches with input genres"
 * 
 *    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
 *    .where("genre").in([...genre])    
 * 
 * 
 *    Step 3: Sorting (Data Arrangement)
 *    - Genre filter ke baad bache movies ko sort karta hai
 *    - Example: sort={"year": "desc"}
 *      > Movies ab year ke hisaab se descending order mein arrange honge
 *      > Data: Same count but sorted order
 * 
 *    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
 *    .where("genre").in([...genre])
 *    .sort(sortBy)
 *    
 *    Step 4: Pagination (Final Data Selection)
 *    - Sorted data ko pages mein divide karta hai
 *    - Example: page=2, limit=3 ka matlab:
 *      
 *      a. skip() operator kaise kaam karta hai:
 *         - skip(page * limit) kitne movies skip karne hain wo calculate 
 *           karta hai
 *         - Example: page=2, limit=3
 *           > page * limit = 2 * 3 = 6 
 *           > Pehle 6 movies skip honge
 *      
 *      b. limit() operator ka use:
 *         - Har page par kitne movies dikhane hain wo set karta hai
 *         - Example: limit=3
 *           > Har page par sirf 3 movies dikhenge
 *      
 *      c. Combined pagination ka example:
 *         Database mein 10 movies hain:
 *         [M1, M2, M3, M4, M5, M6, M7, M8, M9, M10]
 *         
 *         User ne request ki: page=2, limit=3
 *         > skip(3) - Pehle 3 movies skip honge [M1,M2,M3]
 *         > limit(3) - Agli 3 movies select hongi [M4,M5,M6]
 *         
 *         Page 1: [M1, M2, M3]
 *         Page 2: [M4, M5, M6] <- ye return hoga
 *         Page 3: [M7, M8, M9]
 *         Page 4: [M10]
 *      
 *      d. Combined query ka matlab:
 *         .skip(page * limit).limit(limit)
 *         = "Pehle X movies skip karo, fir next Y movies return karo"
 *         = "Show Y movies from page number X"
 * 
 *    const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
 *    .where("genre").in([...genre])
 *    .sort(sortBy)
 *    .skip(page * limit).limit(limit)
 *    
 *    Example Flow with Numbers:
 *    1. Total Movies: 14
 *    2. Search "the": ~5-6 movies with "the"
 *    3. Genre "Action": ~3-4 action movies
 *    4. Sort by year desc: Same 3-4 movies sorted
 *    5. Page 2, Limit 3: Only 3 movies shown
 *    
 *    Final Combined Query with Data Flow:
 *    const movies = await Movie.find({ name: { $regex: search, $options: "i" } }) // First Filter
 *        .where("genre")
 *        .in([...genre])    // Second Filter
 *        .sort(sortBy)      // Arrangement
 *        .skip(page * limit)// Pagination Part 1
 *        .limit(limit);     // Pagination Part 2
 * 
 * 
 *    Step 5: Total Movies Count (Final Result)
 *    - countDocuments() method ka use total filtered movies count nikalne ke
 *      liye karte hain
 *    - Ye same filters apply karta hai jo humne movies find karte time kiye
 *      the:
 *      > genre filter: genre array mein se koi bhi genre match hona chahiye
 *      > search filter: movie name mein search term hona chahiye
 *    - Total count frontend ko bhejte hain taki wo:
 *      > Total pages calculate kar sake
 *      > Pagination controls show/hide kar sake
 *      > "Showing X of Y results" type ka message dikha sake
 * 
 *    const total = await Movie.countDocuments({
 *		genre: { $in: [...genre] },
 * 		name: { $regex: search, $options: "i" },
 *    });
*/



router.get("/movies", async (req, res) => {
	try {
		// Page number (0-based index ke liye -1)
		const page = parseInt(req.query.page) - 1 || 0;
		
		// Movies per page
		const limit = parseInt(req.query.limit) || 5;
		
		// Search query
		const search = req.query.search || "";
		
		// Sort field
		let sort = req.query.sort || "rating";
		
		// Genre filter
		let genre = req.query.genre || "All";

		const genreOptions = [
			"Action",
			"Romance",
			"Fantasy",
			"Drama",
			"Crime",
			"Adventure",
			"Thriller",
			"Sci-fi",
			"Music",
			"Family",
		];

		genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

		const movies = await Movie.find({ name: { $regex: search, $options: "i" } })
			.where("genre")
			.in([...genre])
			.sort(sortBy)
			.skip(page * limit)
			.limit(limit);

		const total = await Movie.countDocuments({
			genre: { $in: [...genre] },
			name: { $regex: search, $options: "i" },
		});

		const response = {
			error: false,
			total,
			page: page + 1,
			limit,
			genres: genreOptions,
			movies,
		};

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
});

// const insertMovies = async () => {
//     try {
//         const docs = await Movie.insertMany(movies);
//         return Promise.resolve(docs);
//     } catch (err) {
//         return Promise.reject(err)
//     }
// };

// insertMovies()
//     .then((docs) => console.log(docs))
//     .catch((err) => console.log(err))

module.exports = router;
