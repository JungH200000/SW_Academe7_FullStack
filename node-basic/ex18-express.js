/* node-basic/ex18-express.js
npm install express
npm install -D nodemon
# -D : 개발 모드
외장 모듈 express를 이용하면 http보다 편리한 기능을 제공
ex) 라우팅, 미들웨어, 에러 처리 등 다양한 기능을 보유
RESTful : api 구축 시 유용

package.json의 "scripts" 옵션에 "start": "nodemon app" 추가
  "scripts": {
    ...,
    "start": "nodemon app"
  },
그 후 서버 실행할 때 npm start로 하면 package.json에서 설정한 index.js 파일이 실행됨
또는 npm start 파일명.확장자로 하면 해당 파일이 실행됨
*/
const express = require('express'); // 외장 모듈
const app = express();
console.log(app);
