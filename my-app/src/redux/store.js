import { configureStore } from "@reduxjs/toolkit";

import { loadersSlice } from "./loaderSlice";

import { usersSlice } from "./userSlice";

export const store = configureStore({
    reducer:{
        loaders: loadersSlice.reducer,
        users: usersSlice.reducer,
    },
});