import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import CartReducer from "./reducers/cartReducer";
import CountReducer from "./reducers/contReducer";
import ProductsReducer from "./reducers/productsReducer";

const rootReducer = combineReducers({
  count: CountReducer,
  products: ProductsReducer,
  cart: CartReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
