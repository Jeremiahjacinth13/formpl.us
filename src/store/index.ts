import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './slices/templateSlice';
import paginatorReducer from './slices/paginatorSlice';

const store = configureStore({
    reducer:{
        templates: templateReducer,
        paginator: paginatorReducer,
    }
})

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;