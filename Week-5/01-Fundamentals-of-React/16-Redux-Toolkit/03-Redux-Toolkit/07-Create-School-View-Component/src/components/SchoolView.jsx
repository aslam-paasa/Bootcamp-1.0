import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setTopStudent,
    updateSchoolStats
} from "../features/school/schoolSlice";

const SchoolView = () => {
    const schoolStats = useSelector((state) => state.school);
    const students = useSelector((state) => state.students.students);
    const dispatch = useDispatch();

    useEffect(() => {
        const totalStudents = students.length;
        const totalAttendance = students.reduce(
            (sum, student) => sum + parseFloat(student.attendance),
            0
        );
        const averageAttendance = totalAttendance / totalStudents;
        const totalMarks = students.reduce(
            (sum, student) => sum + parseFloat(student.marks),
            0
        );
        const averageMarks = totalMarks / totalStudents;

        const topStudent = students.reduce((prev, current) => {
            return parseFloat(current.marks) > parseFloat(prev.marks)
                ? current
                : prev;
        }, "");

        dispatch(
            updateSchoolStats({
                totalStudents,
                averageAttendance,
                averageMarks,
                topStudent
            })
        );

        dispatch(setTopStudent(topStudent));
    }, [students, dispatch]);

    return (
        <div>
            <h1>School View</h1>
            <p>Total Students: {schoolStats.totalStudents}</p>
            <p>Average Attendance: {schoolStats.averageAttendance.toFixed(2)}</p>
            <p>Average Marks: {schoolStats.averageMarks.toFixed(2)}</p>
            <p>
                Top Student:{" "}
                {schoolStats.topStudent ? schoolStats.topStudent.name : "-"}
            </p>
        </div>
    );
};

export default SchoolView;
