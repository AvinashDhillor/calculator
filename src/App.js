import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "",
      upperScreen: "",
      decimalExists: false,
      operator: "",
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
      display: "",
      decimalExists: false,
      upperScreen: "",
      ResultExists: false,
      operator: ""
    });
  }

  calculate() {
    let expresion;
    if (this.state.operator !== "") {
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

    if (this.state.operator === "") {
      prevValue = this.state.display;
    } else {
      prevValue = "";
    }
    let prevUpperValue = this.state.upperScreen;
    if (prevValue === "0" && value === "0") {
      return;
    }
    let newValue = prevValue + value;
    let newUpperValue = prevUpperValue + value;
    this.setState({
      display: newValue,
      initial: false,
      upperScreen: newUpperValue,
      operator: ""
    });
  }

  decimal() {
    if (this.state.decimalExists) {
      return;
    }
    this.setState(prevState => ({
      display: prevState.display + ".",
      upperScreen: prevState.upperScreen + ".",
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

    if (this.state.operator === "") {
      this.setState(prevState => ({
        operator: value,
        display: value,
        upperScreen: prevState.upperScreen + value,
        decimalExists: false
      }));
    } else {
      let upperScreenValue = this.state.upperScreen.split("");
      upperScreenValue[upperScreenValue.length - 1] = value;
      this.setState(prevState => ({
        operator: value,
        display: value,
        decimalExists: false,
        upperScreen: upperScreenValue.join("")
      }));
    }
  }

  render() {
    return (
      <div>
        <Display
          displayValue={this.state.display}
          upperScreen={this.state.upperScreen}
        />
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
      {props.displayValue === "" ? 0 : props.displayValue}{" "}
    </div>
  </div>
);

//Button keypad of calculator
const Buttons = props => (
  <div>
    <button onClick={props.calculate} id="equals" value="=">
      =
    </button>
    <button onClick={props.number} id="zero" value="0">
      0
    </button>
    <button onClick={props.number} id="one" value="1">
      1
    </button>
    <button onClick={props.number} id="two" value="2">
      2
    </button>
    <button onClick={props.number} id="three" value="3">
      3
    </button>
    <button onClick={props.number} id="four" value="4">
      4
    </button>
    <button onClick={props.number} id="five" value="5">
      5
    </button>
    <button onClick={props.number} id="six" value="6">
      6
    </button>
    <button onClick={props.number} id="seven" value="7">
      7
    </button>
    <button onClick={props.number} id="eight" value="8">
      8
    </button>
    <button onClick={props.number} id="nine" value="9">
      9
    </button>
    <button onClick={props.operator} id="add" value="+">
      +
    </button>
    <button onClick={props.operator} id="subtract" value="-">
      -
    </button>
    <button onClick={props.operator} id="multiply" value="*">
      *
    </button>
    <button onClick={props.operator} id="divide" value="/">
      /
    </button>
    <button onClick={props.decimal} id="decimal" value=".">
      .
    </button>
    <button onClick={props.initial} id="clear" value="C">
      C
    </button>
  </div>
);

export default App;
