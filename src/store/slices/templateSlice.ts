import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE, TemplateInterface } from '../../constants';
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
}

const initialState: TemplateSliceInterface = {
    succeeded: false,
    failed: false,
    loading: false,
    errorMessage: '',
    templates: [],
    hiddenTemplates: [
        {
            name: 'Jermeiah Lena',
            created: '100000',
            category: ['E-commerce', 'Health'],
            description: 'This is some random template you can use for your something',
            link: 'https://linktotemplate.com'
        },
        {
            name: 'Something Nice',
            created: '1000000',
            category: ['Health'],
            description: 'This is some random template you can use for your something',
            link: 'https://linktotemplate.com'
        },
        {
            name: 'Hello There Nice',
            created: '10000000',
            category: ['E-commerce', 'Education'],
            description: 'This is some random template you can use for your something',
            link: 'https://linktotemplate.com'
        },
    ]
}

export const getTemplatesFromAPI = createAsyncThunk(
    'templates/getTemplatesFromAPI',
    async (thunkAPI: any) => {
        try {
            const { data } = await axios.get(API_ENDPOINT);
            return data;
        } catch (error) {
            thunkAPI.rejectWithValue('Something is freaking happened here', 'are you freaking me?')
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
        },

        sortByDate(state, { payload: order }) {
            if (order.toLowerCase() === 'ascending') {
                let rearranged = state.hiddenTemplates.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime())
                state.templates = rearranged;
            } else if (order.toLowerCase() === 'descending') {
                let rearranged = state.hiddenTemplates.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
                state.templates = rearranged;
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

        builder.addCase(getTemplatesFromAPI.rejected, (state, action) => {
            state.errorMessage = 'An Error Occurred';
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