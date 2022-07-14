import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../src/components/Dashboard/redux/dashboard';
import conversationReducer from '../src/components/Conversation/redux/conversation';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    conversation: conversationReducer,
  },
})