import React from 'react';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value : null,
            class: 'square'
        }
    }
    render() {
        return (
            <button className={this.props.class} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}
export default Square;