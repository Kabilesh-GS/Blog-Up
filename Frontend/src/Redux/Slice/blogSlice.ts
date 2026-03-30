import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BlogState {
  blogs: any[];
  loading: boolean;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
};

const blogSlice = createSlice({
  name : 'blogs',
  initialState,
  reducers : {
    setBlogs : (state, action: PayloadAction<any[]>) => {
      state.blogs = action.payload;
    },
    setLoading : (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    }
  }
})

export const { setBlogs, setLoading } = blogSlice.actions;
export default blogSlice.reducer;