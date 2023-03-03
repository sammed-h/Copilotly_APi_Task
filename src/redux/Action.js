import axios from "axios";
import { GET_DATA } from "./Constants";

export const getAllData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const result = await response.data;
      dispatch({ type: GET_DATA, payload: result });
    } catch (error) {
      console.log(error);
    }
  };
};
