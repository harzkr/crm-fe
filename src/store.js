import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../src/components/Dashboard/redux/dashboard';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
})