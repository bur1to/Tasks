function reverseString(str1) {
  const str2 = str1.split('').reverse().join('');
  
  return str2;
}
  
module.exports = reverseString;
