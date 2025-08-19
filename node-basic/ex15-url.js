// node-basic/ex15-url.js
const str1 = `https://shopping.naver.com/window/brand-fashion/category?menu=20013478#hash`;
const str2 = `https://example.com:8080/path/name?query=string&query2=string2#page1`;

// 1. WHATWG에서 URL 표준을 따르는 api 제시 (권장)
const url = require('url');
const { URL } = url;
const myUrl = new URL(str1); // WHATWG에서 제시한 표준
console.log(myUrl);
console.log('=========================');
console.log(myUrl.hostname);
console.log(myUrl.search);
console.log(myUrl.searchParams);
console.log(myUrl.searchParams.get('menu'));
console.log(myUrl.hash);

console.log('===== url.parse =====');
// 2. url.parse(url 주소): url 주소 분해하는 역할 => legacy 방식
// url.format(객체): 분해된 객체를 원래 상태로 조립한 문자열을 반환
const parseUrl = url.parse(str2); // 취소선 생김 => 현재 사용 안한다는 의미
console.log(parseUrl);
console.log(parseUrl.query);
console.log(parseUrl.pathname);
console.log('url.format(): ', url.format(parseUrl));
