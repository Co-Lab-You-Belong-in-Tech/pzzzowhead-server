const weekdayConvertor = (array) => {
  if (array.length > 2) {
  const word = ['and']
  word.push(array[array.length - 1]);
  array.pop();
  const finalDay = word.join(' ');
  array.push(finalDay);
  return array.join(', ')
  } else if (array.length === 2) {
    return array.join(' and ')
  } else if (array.length === 1) return array[0]
}

module.exports = weekdayConvertor;