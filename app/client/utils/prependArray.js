export const prependArray = (value, array) => {
  let newArray = array.slice();
  newArray.unshift(value);
  return newArray;
};