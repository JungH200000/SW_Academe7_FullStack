import React, { Component } from 'react';
import Demo from './components/Comp04';

export default class App09 extends Component {
    render() {
        return (
            <div className="container py-5">
                <h1>클래스형 App09 - state 사용 (부모) </h1>
                <hr></hr>
                <Demo></Demo>
            </div>
        );
    }
}
