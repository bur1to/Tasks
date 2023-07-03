function mathOperations(operation, nums) {
  let res = 0;
  for (let i = 0; i < nums.length; i++) {
    if (operation === '+') {
      res += nums[i];
    }
  
    if (operation === '-') {
      res -= nums[i];
    }
  
    if (operation === '*') {
      res = nums.reduce((a, b) => a * b, 1);
  
      if (!Number.isInteger(res)) {
        res = res.toFixed(1);
      }
    }
  
    if (operation === '/') {
      res = 1;
      res /= nums[i];
  
      if (!Number.isInteger(res)) {
        res = res.toFixed(1);
      }
    }
  }
  
  return Number(res);
}
  
module.exports = mathOperations;