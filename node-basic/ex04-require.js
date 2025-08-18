// node-basic/ex04-require.js/
/**
 * require('모듈파일명')
 * - 이 때 확장자 .js는 생략해도 된다
 * requrie('./module1') 동작 과정
 * [1] require()하면 먼저 module1.js를 찾는다.
 * [2] 해당 파일이 없으면 module1이라는 디렉토리를 찾는다.
 * [3] 디렉토리가 있으면 해당 디렉토리의 index.js를 찾는다.
 */
const obj = require('./ex04-module');
console.log(obj.pi);

const area = obj.areaCircle(obj.pi, 1);
console.log(area);

const plus = obj.plus(10, 29);
console.log(plus);

const result = obj.minus(99, 29);
console.log(result);

const obj2 = require('./sample/index');
const multi = obj2.multi(12, 10);
console.log(multi);

const divide = obj2.divide(5, 2);
console.log(divide);
