// TimerClock.jsx
import { useState, useEffect } from 'react';
import { FcAlarmClock } from 'react-icons/fc';

// setInterval() 이용해서 1초마다 새로운 시간정보 받아오기 => time값 변경
//=> useEffect훅에서

const TimerClock = () => {
    // Date객체 :  const today = new Date()
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        console.log('useEffect호출됨');
        const pid = setInterval(() => {
            //time =new Date() //[x]
            setTime(new Date());
            console.log('1초 간격으로 시간 정보 얻어옴: pid=', pid);
        }, 1000);

        return () => {
            clearInterval(pid);
            console.log('setInterval 정리함');
        };
    }, []);

    return (
        <div className="mt-4">
            <h1 className="text-primary">
                <FcAlarmClock /> {time.toLocaleTimeString()}
            </h1>
        </div>
    );
};
export default TimerClock;
