// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from '../store/features/counter/counterSlice'
import productReducer from '../store/features/product/productSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

// ✨ Thay storage từ localStorage sang indexedDB
import createIndexedDBStorage from 'redux-persist-indexeddb-storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

// ✅ Tạo storage từ indexedDB
const storage = createIndexedDBStorage('MyAppDB')

const rootReducer = combineReducers({
  counter: counterReducer,
  product: productReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'],
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_SECRET_KEY,
      onError: (err) => console.error('Lỗi mã hóa:', err)
    })
  ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)
