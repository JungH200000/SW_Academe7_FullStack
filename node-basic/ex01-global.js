// node-basic/ex01-global.js
// node.js의 기본 내장 객체
/* ## global
 - node 설치 시 기본적으로 제공되는 객체
 - 모든 모듈에서 접근 가능한 전역 객체
 - require 없이 불러올 수 없다.
 - Node.js의 런타임 환경 내에서 전역적으로 사용할 수 있는 다양한 속성과 함수들을 제공한다. 
   브라우저 환경의 window 객체와 유사하지만, Node.js의 환경에 맞게 구성
   (브라우저가 아니므로 window객체 없음. 대신 global객체로 이용)
   console.log(window.alert('hi')); [x]
- 이 객체에 직접 접근하거나 자신만의 전역 변수를 추가하는 것이 가능
 */
console.log(global);
console.log('*********');

// console.log도 원래 global.console.log();인데,
// global이 전역 객체이다 보니 생략해서 사용 가능
global.setTimeout(() => {
  // global 생략 가능
  console.log('1초 후에 실행...');
}, 1000);

// 전역 변수/함수를 만들고 싶다면 global 붙이기
global.myvar = '전역변수';
global.myfunc = () => {
  console.log('global function');
};
console.log(myvar);
myfunc();

// ## node의 전역 변수
// __filename, __dirname : 경로에 대한 정보를 제공
console.log('현재 실행 중인 파일 명: %s', __filename); // %s: 해당 위치에 문자열 출력
console.log('현재 실행중인 파일의 상위 경로: %s', __dirname);
