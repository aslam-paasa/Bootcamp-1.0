const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 8082;

/**
 * 1. Connect to mongodb using mongoose
 */
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/masynctech");
    console.log("Mongodb has been connected successfully");
  } catch (error) {
    console.log(`Error connecting to mongodb ${error}`);
  }
};
connectToDB();

/**
 * 2. Design Our user profile + students schema
 */

const userProfileSchema = new mongoose.Schema({
  username: String,
  age: Number,
  birthday: Date,
  isActive: Boolean,
  hobbies: [String],
  objectID: mongoose.Schema.Types.ObjectId,
  address: {
    street: String,
    city: String,
    postaclCode: Number,
  },
  customdata: mongoose.Schema.Types.Mixed,
});


const studentsSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    score: Number,
    subjects: [String],
  },
  {
    timestamps: true,
  }
);

/**
 * 3. Create the user model + students model:
 */
const User = mongoose.model("User", userProfileSchema);
const Student = mongoose.model("Student", studentsSchema);



/**
 * 4. Understanding CRUD Operations:
 * 
 *    a. Creating Documents:
 *       > Document: A single record/entry in the database.
 * 
 *       1. Creating document using new Model(): 
 *          const newUser = new User({
 *            username: "masynctech",
 *            age: 26,
 *            birthday: new Date("2001-04-15"), 
 *            isActive: true,
 *            hobbies: ["Soccer", "Reading", "Coding"],
 *            address: {
 *              street: "789 0ak St",
 *              city: "Kumasi", 
 *              postaclCode: 5551,
 *            },
 *            customdata: {
 *              country: "Ghana",
 *            },
 *          });
 *
 *       2. Saving the document/data using save() in the database:
 *          newUser.save()
 *            .then((data) => {
 *              console.log(data);
 *            })
 *            .catch((error) => console.log(error));
 *
 *       3. Adding new document/data using Model.create():
 *          User.create({
 *            username: "emmanuel",
 *            age: 26,
 *            birthday: new Date("2001-04-15"),
 *            isActive: true,
 *            hobbies: ["Soccer", "Reading", "Coding"],
 *            address: {
 *              street: "789 0ak St",
 *              city: "Kumasi",
 *              postaclCode: 5551,
 *            },
 *            customdata: {
 *              country: "Ghana",
 *            },
 *          })
 *            .then((data) => console.log(data))
 *            .catch((err) => console.log(err));
 * 
 *       4. Adding multiple documents/data using Model.insertMany():
 *          User.insertMany([
 *            {
 *              username: "emmanuel",
 *              age: 26,
 *              birthday: new Date("2001-04-15"),
 *              isActive: true,
 *              hobbies: ["Soccer", "Reading", "Coding"],
 *              address: {
 *                street: "789 0ak St",
 *                city: "Kumasi",
 *                postaclCode: 5551,
 *              },
 *              customdata: {
 *                country: "Ghana",
 *              },
 *            },
 *            {
 *              username: "Prince",
 *              age: 28,
 *              birthday: new Date("2001-08-15"),
 *              isActive: true,
 *              hobbies: ["Basketball", "Jogging", "Coding"],
 *              address: {
 *                street: "789 0ak St",
 *                city: "Camp",
 *                postaclCode: 5551,
 *              },
 *              customdata: {
 *                country: "Ghana",
 *              },
 *            },
 *          ])
 *            .then((data) => console.log(data))
 *            .catch((err) => console.log(err));
 * 
 *    b. Reading Documents/Data:
 *       > Reading: Retrieving documents from the database.
 * 
 *       1. Reading all documents/data using find():
 *          User.find()
 *            .then((data) => console.log(data))
 *            .catch((err) => console.log(err));
 * 
 *       2. Reading a single document/data using findOne():
 *          User.findOne({  username: "masynctech" })
 *            .then((data) => console.log(data))
 *            .catch((err) => console.log(err));
 * 
 *       3. Reading a single document/data using findById():
 *          User.findById("652fcb47a0fc777e4baba1e5")
 *            .then((data) => console.log(data))
 *            .catch((err) => console.log(err));
 * 
 *       4. Where() Query:
 *          > Where() is a method that allows you to filter documents based
 *            on a condition.
 * 
 *            const findUsers = async () => {
 *              try {
 *                const users = await User.find().where("age").gte(27);
 *                console.log(users);
 *              } catch (error) {
 *                console.log(error);
 *              }
 *            };
 *            findUsers();
 * 
 *       5. Sort() Query:
 *          > Sort() is a method that allows you to sort documents based
 *            on a condition.
 * 
 *            const findUsers = async () => {
 *              try {
 *                const users = await User.find().sort({ username: -1 });
 *                console.log(users);
 *              } catch (error) {
 *                console.log(error);
 *              }
 *            };
 *            findUsers();
 * 
 *       6. Limit() Query:
 *          > Limit() is a method that allows you to limit the number of 
 *            documents returned.
 * 
 *            const findUsers = async () => {
 *              try {
 *                const users = await User.find().limit(2);
 *                console.log(users);
 *              } catch (error) {
 *                console.log(error);
 *              }
 *            };
 *            findUsers();
 * 
 *       7. Chaining Queries:
 *          > Chaining Queries is a technique that allows you to chain multiple
 *            queries together.
 * 
 *            const findUsers = async () => {
 *              try {
 *                const users = await User.find()
 *                  .where("age")
 *                  .gte(27)
 *                  .sort({ username: 1 })
 *                  .limit(3);
 *                console.log(users);
 *              } catch (error) {
 *                console.log(error);
 *              }
 *            };
 *            findUsers();
*/


/**
 * 1. Creating new student documents/data:
*/
const createStudent = async () => {
  try {
    const newStudents = await Student.create([
      { name: "Alice", age: 25, email: "alice@gmaile", premiumStudent: true },
      { name: "Bob", age: 30, email: "bob@gmaile", premiumStudent: true },
      { name: "Prince", age: 22, email: "prince@gmaile", premiumStudent: true },
      {
        name: "Thomas",
        age: 29,
        email: "thomas@gmaile",
        premiumStudent: false,
      },
    ]);
    console.log(newStudents);
  } catch (error) {
    console.log(error);
  }
};
createStudent();

/**
 * 2. Reading student documents/data:
*/
const findUsers1 = async () => {
  try {

    /**
     * 1. $gt: Greater than
     *    > Returns all documents where age is greater than 25
    */
    const studentOne = await Student.find({
      age: { $gt: 25 },
    });
    console.log(studentOne);

    /**
     * 2. where(): Filter documents based on a condition.
     *    > Returns all documents where premiumStudent is true
    */
    const studentTwo = await Student.find().where("premiumStudent").equals(true);
    console.log(studentTwo);

    const studentThree = await Student.find({ premiumStudent: true });
    console.log(studentThree);

    /**
     * 3. in(): Filter documents based on a condition.
     *    > Age should be 40 or 90
    */
    const studentFour = await Student.find({ age: { $in: [40, 90] } });
    console.log(studentFour);


    /**
     * 4. Exclude: Exclude specific fields from the document
     *    > Exclude age, email, premiumStudent, _id
    */
    const studentFive = await Student.find({}, "-age -email -premiumStudent -_id");
    console.log(studentFive);

    /**
     * 5. select(): Select specific fields from the document
     *    > Returns only the 'name' field from all documents
     *    > The minus (-) sign before _id excludes that field
     *    > Input data example:
     *      [
     *        { _id: "123", name: "John", email: "john@gmail.com", age: 25, premiumStudent: true },
     *        { _id: "456", name: "Jane", email: "jane@gmail.com", age: 30, premiumStudent: false }
     *      ]
     *    > Output after select("name -_id"):
     *      [
     *        { name: "John" },
     *        { name: "Jane" }
     *      ]
     * Note: It helps to reduce data transfer and improve performance.
    */
    const studentSix = await Student.find().select("name -_id");
    console.log(studentSix);

  } catch (error) {
    console.log(error);
  }
};
findUsers1();


/**
 * 3. Updating student documents/data:
*/

/**
 * a. updateOne(): Update a single document/data
*/

// const updateOneFn = async () => {
//   try {
//     const updatedStudent = await Student.updateOne(
//       { name: "Prince" },
//       { email: "prince2@gmail.com", age: 30 },
//       { new: true }
//     );
//     console.log(updatedStudent);
//   } catch (error) {
//     console.log(error);
//   }
// };
// updateOneFn();


/**
 * b. findByIdAndUpdate(): Update document/data by id
*/
// const updateDoc = async () => {
//   try {
//     const updatedStudent = await Student.findByIdAndUpdate(
//       "653104c135996c1e2f75a8c6",
//       { email: "bob2@gmail.com", age: 21, name: "Bob2" },
//       { new: true }
//     );
//     console.log(updatedStudent);
//   } catch (error) {
//     console.log(error);
//   }
// };
// updateDoc();


/**
 * c. updateMany(): Update multiple documents/data
*/
// const updateDoc = async () => {
//   try {
//     const updatedStudent = await Student.updateMany(
//       { age: { $gt: 20 } },
//       { premiumStudent: false },
//       { new: true }
//     );
//     console.log(updatedStudent);
//   } catch (error) {
//     console.log(error);
//   }
// };
// updateDoc();


/**
 * d. findOneAndUpdate(): Update a single document/data by id
*/
// const updateDoc = async () => {
//   try {
//     const updatedStudent = await Student.findOneAndUpdate(
//       { _id: "653104c135996c1e2f75a8c8" },
//       { premiumStudent: true, name: "Emma" },
//       { new: true }
//     );
//     console.log(updatedStudent);
//   } catch (error) {
//     console.log(error);
//   }
// };
// updateDoc();

/**
 * e. update operators(): Update operators
*/
const updateDoc = async () => {
  try {
    /**
     * 1. Create the student
    */
    await Student.create({
      name: "Thomas",
      age: 20,
      subjects: ["Math"],
      score: 85,
    });

    /**
     * 2. $set $unset
     *    > $set: Update the value of a field
     *    > $unset: Remove a field from the document
    */
    const studentOne = await Student.findOneAndUpdate(
      { name: "Thomas" },
      {
        $set: { age: 23 },
        $unset: { score: 1 },
      },
      { new: true }
    );
    console.log(studentOne);

    /**
     * 3. $addToset $Push
     *    > $addToSet: Add a value to an array if it doesn't exist
     *    > $push: Add a value to an array
    */
    const studentTwo = await Student.findOneAndUpdate(
      { name: "Thomas" },
      {
        $addToSet: { subjects: "Physics" },
        $push: { subjects: "Chemistry" },
      },
      { new: true }
    );
    console.log(studentTwo);

    /**
     * 4. $inc $mul
     *    > $inc: Increment the value of a field
     *    > $mul: Multiply the value of a field
    */
    const studentThree = await Student.findOneAndUpdate(
      { name: "Thomas" },
      {
        $inc: { age: -10 },
        $mul: { score: -2 },
      },
      { new: true }
    );
    console.log(studentThree);

    /**
     * 5. $pop $pull
     *    > $pop: Remove the last element of an array
     *    > $pull: Remove all elements of an array that match a condition
    */
    const studentFour = await Student.findOneAndUpdate(
      { name: "Thomas" },
      {
        $pop: { subjects: 1 },
        $pull: { subjects: "Math" },
      },
      { new: true }
    );
    console.log(studentFour);

    /**
     * 6. $min $max
     *    > $min: Update the value of a field to the minimum value
     *    > $max: Update the value of a field to the maximum value
    */
    const studentFive = await Student.findOneAndUpdate(
      { name: "Thomas" },
      {
        $pop: { subjects: 1 },
        $min: { age: 18 },
        $max: { age: 22 },
      },
      { new: true }
    );
    console.log(studentFive);

    /**
     * 7. $currentDate
     *    > $currentDate: Update the value of a field to the current date
    */
    const studentSix = await Student.findOneAndUpdate(
      { name: "Thomas" },
      {
        $currentDate: { lastModified: new Date() },
      },
      { new: true }
    );
    console.log(studentSix);
  } catch (error) {
    console.log(error);
  }
};
updateDoc();




/**
 * 4. Deleting student documents/data:
*/

const deleteDoc = async () => {
  try {
    /**
     * 1. findByIdAndDelete(): Delete a single document/data by id
    */
    const deletedStudentOne = await Student.findByIdAndDelete("6532889484f00e012a4ed8f7");
    console.log(deletedStudentOne);

    /**
     * 2. findOneAndDelete(): Delete a single document/data
    */
    const deletedStudentTwo = await Student.findOneAndDelete({ name: "Alice" });
    console.log(deletedStudentTwo);

    /**
     * 3. deleteMany(): Delete multiple documents/data
    */
    const deletedStudentThree = await Student.deleteMany({ age: { $gt: 20 } });
    console.log(deletedStudentThree);

    /**
     * 4. findOneAndDelete(): Delete a single document/data
    */
    const deletedStudentFour = await Student.findOneAndDelete({ name: "Alice" });
    console.log(deletedStudentFour);

    /**
     * 5. deleteMany(): Delete multiple documents/data
    */
    const deletedStudentFive = await Student.deleteMany({ age: { $gt: 20 } });
    console.log(deletedStudentFive);
  } catch (error) {
    console.log(error);
  }
};
deleteDoc();

/**
 * Start the server
 */
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
