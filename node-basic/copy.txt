//ex02_process.js
/* 전역객체
[1] console : 콘솔창에 출력할 때 사용
[2] process : 프로세스 실행 정보를 다루는 객체
*/
console.log('정수 출력: %d', 100);
console.log('실수 출력: %d', 3.141592);
console.log('실수 출력: %s', (3.141592).toFixed(2));
console.log('문자열 출력: %s', 'Hello Node.js');
console.log('json객체 출력: %j', { id: 1, name: '김철수' });
const arr = [
  { id: 1, name: '김철수', age: 22 },
  { id: 2, name: '최철수', age: 23 },
  { id: 3, name: '송철수', age: 24 },
];
console.log('json객체(배열) 출력: %j', arr);
console.table(arr); //배열을 인수로 전달 => 테이블 형식으로 출력

let total = 0;
console.time('sum');
for (let i = 1; i <= 10000; i++) {
  total += i;
}
console.timeEnd('sum'); // sum: 0.151ms
console.log('1~10000 까지의 누적합: %d', total);
//console.error(), warn(), debug(), info(), assert(1==2):검증할 때 사용  등의 함수를 갖는다
console.log('*************************');
/**[2] process객체 : 프로그램과 프로세스 관련 기능을 수행
 * 속성/메소드
 * 1)argv : 프로세스를 실행할 때 전달되는 매개변수 정보
 * 2)env : 환경변수 정보
 * 3) arch : 프로세서의 아키텍처 표시
 * 4) version : Node 버전
 * 5) versions : 종속된 프로그램 버전
 * 6) platform : 플랫폼 정보 표시
 * 7)exit() : 프로세스 종료시키는 메소드
 * 8) memoryUsage(): 메모리 사용정보 객체 반환
 * 9) uptime() : 현재 프로그램이 실행된 시간
 */
//node ex02_process 99 88 77
console.log('argv 속성의 파라미터 수: %d', process.argv.length);
console.dir(process.argv);
const score = Number(process.argv[2]) + Number(process.argv[3]) + Number(process.argv[4]);
console.log('score: %d', score);
console.log('-----------------------');
//process.env : 운영체제에 의해 설정된 환경변수를 포함함
// console.dir(process.env);
console.log(process.env.OS);
console.log(process.env['Path']); //process.env.Path

const handler = function () {
  console.log('Process Exit...Bye Bye ~~~');
};
process.addListener('exit', handler);

// process.exit();
/**1. node에서 event 등록하는 방법
 * [1] addListener('이벤트', 핸들러함수)
 * [2] on('이벤트', 핸들러함수)
 *
 * 2. 이벤트를 강제로 발생시키고자 할 때는
 *     emit('이벤트종류')
 */
process.on('myevent', () => {
  console.log('Hello I am myevent');
});
process.emit('myevent');
