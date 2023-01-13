const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return action.payload;

    default:
      return state;
  }
};
