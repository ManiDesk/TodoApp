import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './reducer';
import basicdetailreducer from './createSlice/basicDetailSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    basicdetails : basicdetailreducer,
  },
});
