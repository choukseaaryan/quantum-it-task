const InitialState = {
  users: [],
};

const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.data,
      };
    default:
      return state;
  }
}

export default userReducer;