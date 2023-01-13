export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_CART" });
  } catch (error) {}
};

export const addToCart = (item) => async (dispatch) => {
  try {
    dispatch({ type: "ADD_TO_CART", payload: item });
  } catch (error) {}
};

export const removeFromCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  } catch (error) {}
};

export const incrementQuantity = (id) => async (dispatch) => {
  try {
    dispatch({ type: "INCREMENT_CART", payload: id });
  } catch (error) {}
};

export const decrementQuantity = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DECREMENT_CART", payload: id });
  } catch (error) {}
};
