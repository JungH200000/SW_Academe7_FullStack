document.addEventListener('DOMContentLoaded', ()=>{

    const checkEmailBtn=document.querySelector('#checkEmailBtn')
    const emailCheckResult = document.querySelector('#emailCheckResult');
    const emailInput = document.querySelector('#email')
    const frm = document.querySelector('#frm');

    let isValidEmail=false;

    checkEmailBtn.onclick=function(){
        //1. 사용자가 입력한 이메일 값
        const email = emailInput.value;
        if(!email){
            alert('이메일을 입력하세요')
            emailInput.focus();
            return;
        }
        const url=`/api/check-email?email=`+encodeURIComponent(email);
        //2. 백엔드에 email값을 가지고 요청을 보내서 사용 가능한지 여부를 물어본다
        fetch(url)
        .then((res)=>{
            if(!res.ok) throw new Error('네트워크 오류')
            return res.json();
        })
        .then((data)=>{
            //alert(JSON.stringify(data))
            if(data.exists){//이미 사용중
                isValidEmail=false;
                emailCheckResult.innerHTML=email+"은 이미 사용 중 입니다";
                emailCheckResult.style.color='red';
            }else{
                isValidEmail=true;
                emailCheckResult.innerHTML=email+'은 사용 가능합니다';
                emailCheckResult.style.color='green'
            }
        })
        .catch((err)=>{
            //alert(err)
            console.error(err)
            emailCheckResult.innerHTML='확인 중 에러 발생'
            isValidEmail=false;
        })
    }//--------------------
    //이메일 입력값 변경할 때 다시 중복확인이 필요하도록 설정
    emailInput.oninput=()=>{
        emailCheckResult.innerHTML='이메일 중복 여부를 체크하세요';
        emailCheckResult.style.color='red';
        isValidEmail=false;
    }//-----------------

    //form전송시 유효한 이메일을 보내는지 체크
    frm.onsubmit=(evt)=>{
        if(!isValidEmail){
            alert('이메일 중복 체크를 해야 해요!!');
            emailInput.select()
            evt.preventDefault();
            return;
        }
    }//onsubmit------------
})