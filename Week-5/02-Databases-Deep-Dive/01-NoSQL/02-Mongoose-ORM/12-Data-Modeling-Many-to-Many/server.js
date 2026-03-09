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
 * 2. Many-to-Many Relationship Explanation:
 *    A many-to-many relationship means:
 *    - One student can enroll in multiple courses
 *    - One course can have multiple students
 *    
 *    Example:
 *    - Alice -> Math 101, History 101, Physics 101
 *    - Bob -> Math 101, Chemistry 101
 *    - Math 101 -> Alice, Bob, Charlie
 *    
 *    Implementation:
 *    - Course Schema maintains an array of enrolled students
 *    - Student Schema maintains an array of enrolled courses
 *    - Both sides use ObjectId references to maintain the relationship
 */

const courseSchema = new mongoose.Schema(
  {
    name: String,
    enrolledStudents: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Student" // Reference to Student model
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * 3. Create Course model
 */
const Course = mongoose.model("Course", courseSchema);

/**
 * 4. Student Schema with many-to-many relationship
 */
const studentSchema = new mongoose.Schema(
  {
    name: String,
    enrolledCourse: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Course" // Reference to Course model
      }
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * 5. Create Student model
 */
const Student = mongoose.model("Student", studentSchema);

/**
 * 6. Create the courses
 */
// const createCourses = async () => {
//   try {
//     //create courses
//     const courses = await Course.create([
//       {
//         name: "Math 101",
//       },
//       {
//         name: "History 101",
//       },
//     ]);
//     console.log(courses);
//   } catch (error) {
//     console.log(error);
//   }
// };
// createCourses();

/**
 * 7. Register Student
 */

const createStudents = async () => {
  try {
    //Create student
    const students = await Student.create([
      { name: "Alice" },
      { name: "Emma" },
    ]);

    console.log(students);
  } catch (error) {
    console.log(error);
  }
};

// createStudents();

/**
 * 8. Student Applying to courses
 */
const applyToCourse = async () => {
  try {
    /**
     * a. Find the student
     */
    const foundStudent = await Student.findById("6651bc9cd2b86616829bd69a");

    /**
     * b. Find the course
     */
    const courseFound = await Course.findById("66519b1faee508746a1e9783");

    /**
     * c. Apply to the course 
     *    > push the course found into the student's enrolledCourse field
     *    > push the student found into the courses's enrolledStudents field
     */
    foundStudent.enrolledCourse.push(courseFound._id);
    courseFound.enrolledStudents.push(foundStudent._id);

    /**
     * d. Resave the student and course docs
     */
    await foundStudent.save();
    await courseFound.save();

    /**
     * e. Log the student and course
     */
    console.log(foundStudent);
    console.log(courseFound);
  } catch (error) {
    console.log(error);
  }
};
applyToCourse();

/**
 * 9. Start the server
 */
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));
