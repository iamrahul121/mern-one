// const GetData = () => {
//   return JSON.parse(localStorage.getItem("navToggle"));
// };
export const initialState = false;

// console.log(navToggle);
export const reducer = (state, action) => {
  if ((action.type = "USER")) {
    return action.payload;
  }
  return state;
};
