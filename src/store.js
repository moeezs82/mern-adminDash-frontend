import { configureStore } from "@reduxjs/toolkit";
import { modeReducer, userReducer } from "reducers/globalReducer";
import { productReducer } from "reducers/productReducer";
import { transactionReducer } from "reducers/transactionReducer";
import { customerReducer } from "reducers/userReducer";
import { combineReducers } from "redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, modeReducer);

const reducer = combineReducers({
  mode: persistedReducer,
  user: userReducer,
  products: productReducer,
  customers: customerReducer,
  transactions: transactionReducer
});

let initialState = {};

export const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
