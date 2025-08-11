import React from 'react';

class YourComp extends React.Component {
    // 부모로부터 props값이 전달되지 않을 때 설정할 기본값
    static defaultProps = {
        bg: 'yellow',
        children: '기본 메시지',
    };

    render() {
        console.log(this.props.children);
        // this.props.bg = 'pink'; [x] 불변성(immutable)  readonly 여서 변경 불가
        const { bg, children } = this.props;

        return (
            <div style={{ backgroundColor: bg }} className="py-3 text-center">
                <h2>Your Comp {children} </h2>
            </div>
        );
    }
}
export default YourComp;
