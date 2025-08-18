// node-basic/ex05-require.js/
// ex05-module 가져와서 square(), circle(), rectangle() 호출해보기
const obj = require('./ex05-module');

const square = obj.square(5);
console.log(square);

console.log(obj.rectangle(40, 6));
console.log(obj.circle(12));
