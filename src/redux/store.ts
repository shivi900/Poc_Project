
import cartReducer from './reducers/cartReducer';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Redux Persist Configuration
const persistConfig = {
  key: 'root', // Key for local storage
  storage: AsyncStorage, // Use AsyncStorage for React Native
};
const rootReducer = combineReducers({
  cart: cartReducer, // Ensure the key matches what you're accessing in `useSelector`
});
// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = createStore(persistedReducer);

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };

