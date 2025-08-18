// node-basic/sample/index.js
// multi(), divide() 함수를 구성해서 export
// ex04-require.js에서 multi(), divide()를 호출해 결과 출력
exports.multi = (a, b) => {
  console.log(`${a} x ${b} = ${a * b}`);
  return a * b;
};

exports.divide = (a, b) => {
  console.log(`${a} / ${b} = ${a / b}`);
  return a / b;
};
