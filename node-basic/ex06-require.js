// node-basic/ex06-require.js
// sample2에서 모듈을 가져와서 plus(), minus(), square(), printStar() 호출
const obj = require('./sample2/index');

const plus = obj.calc.plus(2, 5);
console.log(plus);

const square = obj.area.mysquare(10);
console.log(square);

const { calc, carea, printStar } = obj;
printStar(4);
