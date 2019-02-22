import React, {Component} from 'react';

class ErrorComponent extends Component {
    render() {
        return (
            <div>
                {this.props.error && (<span style={{color: 'red'}}>{this.props.error}</span>)}
            </div>
        );
    }
}

export default ErrorComponent;
