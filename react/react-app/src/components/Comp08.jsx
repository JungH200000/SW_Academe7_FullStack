import React from 'react';
import { useState } from 'react';
export default function ImageGallery() {
    const data = [
        { name: 'BTS', desc: '멋진 앨범', image: 'images/bts.png' },
        { name: 'BlackPink', desc: '멋진 앨범2', image: 'images/blackpink.png' },
        { name: 'IVE', desc: '멋진 앨범3', image: 'images/ive.PNG' },
        { name: 'DemonHunters', desc: '멋진 앨범4', image: 'images/hunters.jpg' },
    ];
    /*
    <div>
                    <img></img>
                    <h3>아이돌이름 - 앨범이름</h3>
                </div>
    */

    const [idols, setIdols] = useState(data);
    return (
        <div>
            <h2>Image Gallery</h2>
            <hr></hr>
            {idols.map((obj, i) => {
                return (
                    <div key={i}>
                        <img src={obj.image} alt={obj.name} style={{ width: '280px' }}></img>
                        <h3>
                            {obj.name} - {obj.desc}
                        </h3>
                    </div>
                );
            })}
        </div>
    );
}
