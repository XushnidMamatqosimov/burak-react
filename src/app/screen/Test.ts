
// @ts-nocheck
import React, { Component } from "react";

class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }

  changeDetails = () => {
    this.setState({ color: "blue", brand: "Tesla", model: "Model 5", year: "2023" })
  };

  componentDidMount(): void {
    console.log("Component Mount");
    // runs after first render;
  }

  componentWillUnmount(): void {
    console.log("Component will unmount");
    // runs before component unmount
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    
  }

  render() {
    return React.createElement(
      "div",
      null,
      React.createElement("h1", null, "My", this.state.brand),
      React.createElement(
        "p",
        null,
        "It is a ",
        this.state.color,
        " ",
        this.state.model,
        " from ",
        this.state.year,
        "."
      ),
      React.createElement(
        "button",
        { type: "button", onClick: this.changeColor },
        "Change color"
      )
    );
  }
}

export default Test;