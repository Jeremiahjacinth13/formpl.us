import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './slices/templateSlice';

const store = configureStore({
    reducer:{
        templates: templateReducer
    }
})

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;