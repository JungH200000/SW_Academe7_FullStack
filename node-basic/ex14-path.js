// node-basic/ex14-path.js
const path = require('path');
// 파일 경로 처리 등의 기능 제공
const dirs = ['D', 'devSource', 'Node-basic'];
console.log(path.sep);
/* path.sep: 운영체제에 맞는 파일 경로 구분자 적용
  Window: /
  Unix, Linux: \
 */
const dirsStr = dirs.join(path.sep);
console.log(dirsStr);

console.log(__dirname);

const curPath = path.join(__dirname, 'ex14-path.js');
console.log(curPath);

const upDir = path.dirname(curPath); // 상위 디렉초리명
const fname = path.basename(curPath); // 파일명만 추출(확장자 포함)
const ext = path.extname(curPath); // 확장자만 추출
console.log('디렉토리명: ', upDir);
console.log('파일명: ', fname);
console.log('확장자: ', ext);

const filePath = '/home/user/project/file.txt';
// 2단계 상위 디렉토리 얻기
const twoLevelUp = path.join(filePath, '../', '../');
console.log(twoLevelUp);

const absPath = path.resolve(twoLevelUp); // 절대 경로 반환
console.log(absPath);
