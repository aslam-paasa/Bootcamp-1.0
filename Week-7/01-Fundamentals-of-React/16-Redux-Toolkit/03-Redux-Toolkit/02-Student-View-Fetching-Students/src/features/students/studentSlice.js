import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
    "students/fetchStudents",
    async () => {
        const response = await axios.get(
            "https://reduxtoolkit-example-student-management.tanaypratap.repl.co/students"
        );
        console.log(response.data);
        return response.data;
    }
);


const initialState = {
    students: [],
    status: "idle",
    error: null,
};

export const studentsSlice = createSlice({
    name: "students",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchStudents.pending]: (state) => {
            state.status = "loading";
        },
        [fetchStudents.fulfilled]: (state, action) => {
            state.status = "success";
            state.students = action.payload;
        },
        [fetchStudents.rejected]: (state, action) => {
            state.status = "error";
            console.log(action.error.message);
            state.error = action.error.message;
        },
    }
});

