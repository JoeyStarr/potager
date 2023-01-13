const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART":
      return { ...state };

    case "ADD_TO_CART":
      const itemInCart = state.find((item) => item.id === action.payload.id);

      if (itemInCart) {
        itemInCart.quantity++;
      } else state.push({ ...action.payload, quantity: 1 });
      return [...state];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "INCREMENT_CART":
      const itemToIncIndex = state.findIndex(
        (item) => item.id === action.payload
      );
      state[itemToIncIndex].quantity++;
      return [...state];

    case "DECREMENT_CART":
      const itemToDecIndex = state.findIndex(
        (item) => item.id === action.payload
      );
      let qty = state[itemToDecIndex].quantity;
      if (qty > 1) {
        state[itemToDecIndex].quantity--;
      }
      return [...state];

    default:
      return [...state];
  }
};
