/**
 * Syntax of Mongoose to Insert/Create data in Database :
 * 
 *    const UserSchema = new mongoose.Schema({           User.create({
 *       username: String,                                  username: req.body.username;
 *       password: String                      ========>    password: req.body.password;
 *    })                                                 });
 * 
 *    const User = mongoose.model('User', UserSchema);
 *    => This is the final object on which we do the CRUD method.
*/

/**
 * Step-1 : UserSchema is username & password
*/
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

/**
 * => This is how we create the model. 
 * => Means this "User" is the final object on which we call "CRUD", 
 *    that let's us do the CRUD Operation on the database.
*/
const User = mongoose.model('User', UserSchema); 



/**
 * 1. Create data:
 * => This is the function we will be calling.
 * => This will put an entry in our database.
*/
User.create({
    username: req.body.username,
    password: req.body.password
});


/**
 * 2. Read data:
*/
User.findById("1");
User.findOne({
    username: "harkirat@gmail.com",
})
User.find({
    username: "harkirat96@gmail.com",
})


/**
 *  3. Update data:
*/

/**
 * If we want to add a new entry to the purchasedCourses.
 * If someone actually buy the course in our application, we want to
 * push a new course here. This is the syntax.
 * Basically, it means User with this id-1, push to their purchasedCourses
 * this specific course Id.
*/
User.updateOne(
    { "id": "1" },
    { $push: { purchasedCourses: courseId } }
)

User.updateOne(
    { "id": "1" },
    {password: "newPassword"}
);

/**
 * {} => empty means update every data 
 * => It means for every row in the table, make this update set "premium: true". 
 *    Means give free access to the people & premium field represents that.
*/
User.update({},
    { premium: true }
);


/**
 * 4. Delete data:
 * */ 
User.deleteMany({}) // delete everything from user's table

User.deleteOne({ 
    username: "harkirat96@gmail.com"
})


/**
 * Note: This is how we do CRUD in our database.
 * */ 