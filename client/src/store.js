import { createStore } from '@reduxjs/toolkit';
import reducer from './utils/reducers';

const store = createStore(reducer);

export default store;