import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import listdataReducer from './list-data';

const store = configureStore({
    reducer :{auth : authReducer, listdata : listdataReducer}
})
export default store;