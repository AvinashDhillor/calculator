import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      upperScreen: '',
      decimalExists: false,
      operator: '',
      ResultExists: false
    };
    this.initial = this.initial.bind(this);
    this.number = this.number.bind(this);
    this.decimal = this.decimal.bind(this);
    this.operator = this.operator.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  initial() {
    this.setState({
      display: '',
      decimalExists: false,
      upperScreen: '',
      ResultExists: false,
      operator: ''
    });
  }

  calculate() {
    let expresion;
    if (this.state.operator !== '') {
      expresion = this.state.upperScreen.slice(0, -1);
    } else {
      expresion = this.state.upperScreen;
    }
    let result = eval(expresion);
    result = Math.round(result * 100000) / 100000;
    this.setState({
      display: result,
      ResultExists: true
    });
  }

  async number(e) {
    let value = e.target.value;
    let prevValue;

    if (this.state.ResultExists) {
      await this.initial();
    }

    if (this.state.operator === '') {
      prevValue = this.state.display;
    } else {
      prevValue = '';
    }
    let prevUpperValue = this.state.upperScreen;
    if (prevValue === '0' && value === '0') {
      return;
    }
    let newValue = prevValue + value;
    let newUpperValue = prevUpperValue + value;
    this.setState({
      display: newValue,
      initial: false,
      upperScreen: newUpperValue,
      operator: ''
    });
  }

  decimal() {
    if (this.state.decimalExists) {
      return;
    }
    this.setState(prevState => ({
      display: prevState.display + '.',
      upperScreen: prevState.upperScreen + '.',
      decimalExists: true
    }));
  }

  operator(e) {
    let value = e.target.value;
    if (this.state.ResultExists) {
      this.setState({
        upperScreen: this.state.display,
        ResultExists: false
      });
    }

    if (this.state.operator === '') {
      this.setState(prevState => ({
        operator: value,
        display: value,
        upperScreen: prevState.upperScreen + value,
        decimalExists: false
      }));
    } else {
      let upperScreenValue = this.state.upperScreen.split('');
      upperScreenValue[upperScreenValue.length - 1] = value;
      this.setState(prevState => ({
        operator: value,
        display: value,
        decimalExists: false,
        upperScreen: upperScreenValue.join('')
      }));
    }
  }

  render() {
    return (
      <div className="cal_body">
        <div className="cal_display">
          <Display
            displayValue={this.state.display}
            upperScreen={this.state.upperScreen}
          />
        </div>

        <Buttons
          calculate={this.calculate}
          number={this.number}
          operator={this.operator}
          decimal={this.decimal}
          initial={this.initial}
        />
      </div>
    );
  }
}

//Calculator display
const Display = props => (
  <div>
    <div id="upperscreen">{props.upperScreen}</div>
    <div id="display">
      {props.displayValue === '' ? 0 : props.displayValue}{' '}
    </div>
  </div>
);

//Button keypad of calculator
const Buttons = props => (
  <div className="cal_buttons">
    <button
      onClick={props.initial}
      className="btn btn-danger"
      id="clear"
      value="C"
    >
      C
    </button>

    <button
      onClick={props.number}
      className="btn btn-primary"
      id="one"
      value="1"
    >
      1
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="two"
      value="2"
    >
      2
    </button>
    <button
      onClick={props.operator}
      className="btn btn-success"
      id="add"
      value="+"
    >
      +
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="three"
      value="3"
    >
      3
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="four"
      value="4"
    >
      4
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="five"
      value="5"
    >
      5
    </button>
    <button
      onClick={props.operator}
      className="btn btn-success"
      id="subtract"
      value="-"
    >
      -
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="six"
      value="6"
    >
      6
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="seven"
      value="7"
    >
      7
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="eight"
      value="8"
    >
      8
    </button>

    <button
      onClick={props.operator}
      className="btn btn-success"
      id="multiply"
      value="*"
    >
      *
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="nine"
      value="9"
    >
      9
    </button>

    <button
      onClick={props.decimal}
      className="btn btn-warning"
      id="decimal"
      value="."
    >
      .
    </button>
    <button
      onClick={props.number}
      className="btn btn-primary"
      id="zero"
      value="0"
    >
      0
    </button>
    <button
      onClick={props.operator}
      className="btn btn-success"
      id="divide"
      value="/"
    >
      /
    </button>
    <button
      onClick={props.calculate}
      className="btn btn-danger btn-lg btn-block"
      id="equals"
      value="="
    >
      =
    </button>
  </div>
);

export default App;
