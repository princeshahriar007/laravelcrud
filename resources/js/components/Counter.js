import React, { Component } from "react";
import ReactDOM from "react-dom";

// const App = () => {
//     return (<h1>Hello World</h1>);
// }

class Counter extends Component {
    state = {
        counter: 0
    };

    incrementCount = val => {
        let newCount = this.state.counter + val;
        this.setState({
            counter: newCount
        });
    };

    decrementCount = () => {
        let newCount = this.state.counter - 1;
        this.setState({
            counter: newCount
        });
    };

    render() {
        return (
            <div>
                <div className="container">
                    <h2>Count {this.state.counter}</h2>
                    <p>
                        <button
                            className="btn btn-success btn-lg"
                            onClick={() => this.incrementCount(5)}
                        >
                            +
                        </button>
                        <button
                            className="btn btn-danger btn-lg"
                            onClick={this.decrementCount}
                        >
                            -
                        </button>
                    </p>
                </div>
            </div>
        );
    }
}

export default Counter;

if (document.getElementById("Counter")) {
    ReactDOM.render(<Counter />, document.getElementById("Counter"));
}
