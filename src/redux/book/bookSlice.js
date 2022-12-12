import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    books:[],
    bookLoading:true,
    bookDeleteLoading:false,
    bookAddLoading:false,
    bookUpdateLoading:false
}

export const getbooks = createAsyncThunk('book/get', async (_, thunkAPI) => {
    try{
        let res = await axios.get("http://localhost:3005/books");
        return res.data;
    }catch(error){
        console.log(error);
        return thunkAPI.rejectWithValue(error);
    }
})

export const deletebooks = createAsyncThunk ('book/delete', async (id, thunkAPI) => {
    try{
        let res = await axios.delete(`http://localhost:3005/books/${id}`)
        return id;
    }catch(error){
        console.log(error)
        return thunkAPI.rejectWithValue(error);
    }
})

export const addbook = createAsyncThunk ('book/add', async (bookData, thunkAPI) => {
    try{
        let res = await axios.post("http://localhost:3005/books", bookData);
        return res.data;
    }catch(error){
        console.log(error)
        return thunkAPI.rejectWithValue(error);
    }
})

export const updatebook = createAsyncThunk ('book/update', async (data, thunkAPI) => {
    let {updateId, formData} = data;
    try{
        let res = await axios.put(`http://localhost:3005/books/${updateId}`, formData);
        return res.data;
    }catch(error){
        console.log(error);
        return thunkAPI.rejectWithValue(error);
    }
})



const bookSlice = createSlice({
    name:'books',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getbooks.pending,(state, action)=>{
            state.bookLoading = true
        })
        .addCase(getbooks.fulfilled,(state, action)=>{
            state.bookLoading = false
            state.books = action.payload
        })
        .addCase(getbooks.rejected, (state, action)=>{
            state.bookLoading = false
            state.books = []
        })
        .addCase(deletebooks.pending,(state, action)=> {
            state.bookDeleteLoading = true
        })
        .addCase(deletebooks.fulfilled,(state, action)=>{
            state.bookDeleteLoading = false
            state.books = state.books.filter((book)=>book.id !== action.payload)
        })
        .addCase(deletebooks.rejected, (state, action)=>{
            state.bookDeleteLoading = false
        })
        .addCase(addbook.pending, (state, action)=>{
            state.bookAddLoading = true
        })
        .addCase(addbook.fulfilled, (state, action)=>{
            state.bookAddLoading = false
            state.books.push(action.payload)
        })
        .addCase(addbook.rejected, (state, action)=>{
            state.bookLoading = false
        })
        .addCase(updatebook.pending, (state, action) => {
            state.bookUpdateLoading = true
        })
        .addCase(updatebook.fulfilled, (state, action) => {
            state.bookUpdateLoading = false
            state.books = state.books.map((book)=>book.id === action.payload.id ? action.payload : book)
        })
        .addCase(updatebook.rejected, (state, action)=>{
            state.bookUpdateLoading = false
        })
    }

})

export default bookSlice.reducer;