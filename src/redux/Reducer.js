import { GET_DATA } from "./Constants";

const initialState = {
  getAllData: [],
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA: {
      return {
        ...state,
        getAllData: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
