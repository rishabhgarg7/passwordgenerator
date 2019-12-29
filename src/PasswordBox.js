import React, { Component } from "react";
import { Browser } from "react-kawaii";

class PasswordBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      length: 20,
      upperCase: true,
      specialCh: true,
      incnumbers: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.chgen = this.chgen.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  upperCaseGen() {
    let rn = this.randomIntFromInterval(65, 91);
    return String.fromCharCode(rn);
  }

  lowerCaseGen() {
    let rn = this.randomIntFromInterval(97, 97 + 26);
    return String.fromCharCode(rn);
  }

  chgen() {
    let dic = {
      [this.state.upperCase]: this.upperCaseGen,
      [this.state.specialCh]: this.randomIntFromInterval,
      [this.state.incnumbers]: this.randomIntFromInterval
    };
    console.log(dic);
    let newDic = {};
    let fh = Object.keys(dic).filter(key => {
      if (key === "true") {
        console.log(key);
        newDic[key] = dic[key];
        return key === "true";
      } else {
        return false;
      }
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let newPswd = "";
    for (let i = 0; i < this.state.length; i++) {
      this.chgen();
      let ch = this.lowerCaseGen();
      newPswd += ch;
    }

    this.setState({ password: newPswd });
  }
  handleCheckboxChange(evt) {
    this.setState({ [evt.target.name]: evt.target.checked });
  }
  render() {
    return (
      <div>
        <h2>Password Generator</h2>
        <h4>{this.state.password} </h4>
        <div className="PasswordBox form">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="length">Length</label>
            <input
              type="number"
              value={this.state.length}
              onChange={this.handleChange}
              name="length"
            />
            <br />
            <label htmlFor="uppercase">UpperCase</label>
            <input
              type="checkbox"
              checked={this.state.upperCase}
              onChange={this.handleChange}
              name="upperCase"
              onChange={this.handleCheckboxChange}
            />
            <br />
            <label htmlFor="specialCh">Special characters</label>
            <input
              type="checkbox"
              checked={this.state.specialCh}
              onChange={this.handleChange}
              name="specialCh"
              onChange={this.handleCheckboxChange}
            />
            <br />
            <label htmlFor="incnumbers">Include Numbers</label>
            <input
              type="checkbox"
              checked={this.state.incnumbers}
              onChange={this.handleChange}
              name="incnumbers"
              onChange={this.handleCheckboxChange}
            />

            <br />
            <button>Generate Password!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default PasswordBox;
