import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth-slice'
import policyReducer from './features/policy-slice'
import successReducer from './features/successful-slice'
let store

// Check if window is defined (client-side)
if (typeof window !== 'undefined') {
  // Load state from sessionStorage if available
  const persistedState = sessionStorage.getItem('reduxState')
    ? JSON.parse(sessionStorage.getItem('reduxState'))
    : {}

  store = configureStore({
    reducer: {
      auth: authReducer,
      policy: policyReducer,
      success: successReducer,
    },
    preloadedState: persistedState, // Load initial state from sessionStorage
  })

  // Subscribe to Redux store changes
  store.subscribe(() => {
    sessionStorage.setItem('reduxState', JSON.stringify(store.getState()))
  })
} else {
  // If running on the server, create an empty store
  store = configureStore({
    reducer: {
      auth: authReducer,
      policy: policyReducer,
    },
  })
}

export default store
