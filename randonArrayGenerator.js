function generateRandomArray(length = 50, min = 1, max = 100) {
  const array = [];
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    array.push(rand);
  }
  return array;
}

export default generateRandomArray;