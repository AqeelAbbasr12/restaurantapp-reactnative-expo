import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import drawerReducer from './drawer/drawerSlice';
import menuReducer from './menu/menuSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        drawer: drawerReducer,
        menu: menuReducer,
    },
});
