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
 * 2. Design Our Schema with embedded document
 *    > name: String
 *    > age: Number
 *    > grade: String
 */
const studentSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    grade: String,
  },
  {
    timestamps: true,
  }
);

/**
 * 3. Design Our Schema with embedded document
 *    > className: String
 *    > students: [studentSchema]
 */
const classroomSchema = new mongoose.Schema(
  {
    className: String,
    students: [studentSchema],
  },
  {
    timestamps: true,
  }
);

/**
 * 4. Compile the schema to create the model
 */
const Student = mongoose.model("Student", studentSchema);
const Classroom = mongoose.model("Classroom", classroomSchema);

/**
 * 5. Create classroom
 */
// const createClassroom = async () => {
//   try {
//     //create the classroom
//     const newClassroom = await Classroom.create({
//       className: "Math 101",
//       students: [
//         { name: "Alice", age: 20, grade: "A" },
//         { name: "Bob", age: 22, grade: "B" },
//       ],
//     });
//     console.log(newClassroom);
//   } catch (error) {
//     console.log(error);
//   }
// };
// createClassroom();

/**
 * 6. Add student to classroom
 */
const addStudentToClassroom = async () => {
  try {
    //Find the classroom and update
    const classroomUpdated = await Classroom.findByIdAndUpdate(
      "6533562edce067c10b5053d3",
      {
        $addToSet: { students: { name: "Agnes", age: 21, grade: "A" } },
      },
      { new: true }
    );
    console.log(classroomUpdated);
  } catch (error) {
    console.log(error);
  }
};
addStudentToClassroom();

/**
 * 7. Start the server
 */
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
