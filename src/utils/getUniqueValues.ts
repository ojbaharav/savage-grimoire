export const getUniqueValues = <T, K extends keyof T>(data: T[], key: K) => {
  // 1. Extract the values for the given key from each item in the array.
  const values = data.map(item => item[key]);

  // 2. Flatten the array of values. This is important for properties that are themselves arrays (like arcane_background).
  // The flat() method creates a new array with all sub-array elements concatenated into it.
  const flattenedValues = values.flat();

  // 3. Use a Set to get the unique values and then convert the Set back to an array.
  const uniqueValues = [...new Set(flattenedValues)];

  return uniqueValues;
};
