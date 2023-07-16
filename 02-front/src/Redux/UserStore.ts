import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";

const storeNew = configureStore({
    reducer: {
        user: UserReducer,
    }
});

export default storeNew;