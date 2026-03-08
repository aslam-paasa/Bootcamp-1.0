import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useParams } from "react-router-dom";
import { deleteStudentAsync } from "./studentsSlice";

const StudentDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const student = useSelector((state) =>
        state.students.students.find((s) => s._id === id)
    );

    if (!student) {
        return <div>Student not found.</div>;
    }

    const handleDelete = (id) => {
        dispatch(deleteStudentAsync(id));
    };

    return (
        <div>
            <h2>Student Detail</h2>
            <p>Name: {student.name}</p>
            <p>Age: {student.age}</p>
            <p>Grade: {student.grade}</p>
            <p>Attendance: {student.attendance}</p>
            <p>Marks: {student.marks}</p>
            <Link to={`/students/edit/${student.id}`} state={student}>
                Edit Details
            </Link>
            <button onClick={() => handleDelete(student._id)}>Delete</button>
        </div>
    );
};

export default StudentDetail;
