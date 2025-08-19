// node-basic/ex10-fileStream.js
/**
 * 활용 예시
- 대용량 로그 파일 분석
- 대형 CSV 파일 파싱
- 스트리밍 다운로드 구현
- 동영상/오디오 처리

fs.readFile() 은 파일 전체를 한 번에 메모리에 로드하나  fs.createReadStream()의 경우 파일을 조각(chunk)단위로 스트리밍 한다.
fs.readFile() 의 경우 대용량 파일 처리시 비효율적 (메모리 부족 위험), 콜백 방식 
스트림 방식은 효율적 점진적 읽기 가능하며 이벤트 기반으로 처리함 (큰 파일에서 유리함) 큰 로그파일/동영상/오디오 등에 사용
 */
const fs = require('fs');
console.log('');

const fileName = 'ex01-global.js';
const readStream = fs.createReadStream(fileName, {
  encoding: 'utf8',
  // encoding을 하면 파일 데이터가 string으로 들어옴
  // 설정하지 않으면 chunk는 Buffer로 들어옴
  highWaterMark: 16,
  // 파일을 읽을 때 버퍼에 담아서 읽는다.
  // 버퍼 크기 16kb(default는 64kb)
});
// 이벤트 기반 방식(비동기)으로 입력 받음
const data = []; // 파일 데이터가 chunk 단위로 오기 때문에 chunk를 모아 담을 배열 선언
readStream.on('data', function (chunk) {
  // stream data(chunk)를 받을 때마다 호출된다.
  console.log(chunk); // 코드 조각
  console.log(chunk.length);
  data.push(chunk);
});
readStream.on('end', () => {
  // 더 이상 읽을 데이터가 없을 때 수행
  console.log('********' + typeof data);
  if (typeof data === 'object') {
    console.log(data.toString()); // 파일 내용 출력
  } else {
    const buffer = Buffer.concat(data);
    // Buffer는 내부적으로 byte 배열
    console.log(buffer.toString());
  }
});
