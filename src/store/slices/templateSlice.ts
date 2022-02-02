import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateInterface } from '../../constants';
import axios from 'axios';
import {API_ENDPOINT} from '../../constants'



interface TemplateSliceInterface{
    succeeded: boolean,
    failed: boolean,
    loading: boolean,
    hasError: boolean
    errorMessage: string,
    templates: TemplateInterface[],
    displayedTemplates: TemplateInterface[],
}

const initialState: TemplateSliceInterface = {
    succeeded: false,
    failed: false,
    hasError: false,
    loading: false,
    errorMessage: '',
    templates: [],
    displayedTemplates: []
}

export const getTemplatesFromAPI = createAsyncThunk(
    'templates/getTemplatesFromAPI',
    async (thunkAPI: any) => {
        try{
            const { data } = await axios.get(API_ENDPOINT);
            return data;
        }catch(error){
            thunkAPI.rejectWithValue('An Error Occurred')
        }
    }
)

const templateSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        go(){
            console.log('go')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTemplatesFromAPI.fulfilled, (state, action) => {
            state.templates = action.payload;
            state.errorMessage = '';
            state.failed = false;
            state.hasError = false;
            state.loading = false;
            state.succeeded = true;
        });

        builder.addCase(getTemplatesFromAPI.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getTemplatesFromAPI.rejected, (state, action) => {
            state.errorMessage = action.payload as string;
            state.failed = true;
            state.hasError = true;
            state.loading = false;
            state.succeeded = false;
        })
    }
})

export const { go } = templateSlice.actions;

export default templateSlice.reducer;