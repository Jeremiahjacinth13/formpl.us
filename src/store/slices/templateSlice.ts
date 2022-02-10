import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SAMPLE_TEMPLATES, TemplateInterface } from '../../constants';
import axios from 'axios';
import { API_ENDPOINT } from '../../constants'
import { RootState } from '..';



interface TemplateSliceInterface {
    succeeded: boolean,
    failed: boolean,
    loading: boolean,
    errorMessage: string,
    templates: TemplateInterface[],
    hiddenTemplates: TemplateInterface[],
    activeCategoryFilter: 'All' | 'Education' | 'E-commerce' | 'Health'
}

const initialState: TemplateSliceInterface = {
    succeeded: false,
    failed: false,
    // this should be false but I'm initializing it to true
    // because I want the loader to show up immediate the page loads
    loading: true,
    errorMessage: '',
    templates: [],
    hiddenTemplates: [],
    activeCategoryFilter: 'All'
}

export const getTemplatesFromAPI = createAsyncThunk(
    'templates/getTemplatesFromAPI',
    async () => {
        try {
            const { data } = await axios.get(API_ENDPOINT);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
)

const templateSlice = createSlice({
    name: 'templates',
    initialState,
    reducers: {
        filterViaSearch(state, action) {
            let searchResults = state.hiddenTemplates.filter(template => template.name.toLowerCase().includes(action.payload.toLowerCase()));
            state.templates = searchResults;
        },

        filterByCategory(state, { payload: selectedCategory }) {
            if (selectedCategory.toLowerCase() === 'all') {
                state.templates = state.hiddenTemplates;
            } else {
                let searchResults = state.hiddenTemplates.filter(template => template.category.includes(selectedCategory));
                state.templates = searchResults;
            }
            
            state.activeCategoryFilter = selectedCategory;
        },

        sortByDate(state, { payload: order }) {
            if (order.toLowerCase() === 'ascending') {
                let rearranged = state.hiddenTemplates.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime())
                state.templates = rearranged;
            } else if (order.toLowerCase() === 'descending') {
                let rearranged = state.hiddenTemplates.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
                state.templates = rearranged;
            }else{
                state.templates = state.hiddenTemplates;
            }
        },

        sortByOrder(state, { payload: order }) {
            if (order.toLowerCase() === 'ascending') {
                let rearranged = Array.from(state.hiddenTemplates).sort((a, b) => a.name.localeCompare(b.name));
                state.templates = rearranged
            } else if (order.toLowerCase() === 'descending') {
                let rearranged = Array.from(state.hiddenTemplates).sort((a, b) => b.name.localeCompare(a.name));
                state.templates = rearranged;
            }else{
                state.templates = state.hiddenTemplates;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTemplatesFromAPI.fulfilled, (state, action) => {
            state.hiddenTemplates = action.payload;
            state.templates = action.payload;
            state.errorMessage = '';
            state.failed = false;
            state.loading = false;
            state.succeeded = true;
        });

        builder.addCase(getTemplatesFromAPI.pending, (state) => {
            state.loading = true;
        })

        builder.addCase(getTemplatesFromAPI.rejected, (state) => {
            state.errorMessage = 'Unable to reach server. Please check your internet';
            state.failed = true;
            state.loading = true;
            state.succeeded = false;
        })
    }
});


export const {
    filterViaSearch,
    filterByCategory,
    sortByOrder,
    sortByDate
} = templateSlice.actions;

export const templatesSelector = (state: RootState) => state.templates;

export default templateSlice.reducer;