import React, { Component } from 'react';
import './index.css';

class Title extends Component {
  render() {
    return (
      <div className="Title">
        <h1>Pomodoro</h1>
      </div>
    );
  }
}

class Timer extends Component {
  render() {
    return (
      <div className="Timer">
        25:00
      </div>
    );
  }
}

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Title />
        <Timer />
      </div>
    );
  }
}

class ProgressBar extends Component {
  render() {
    return (
      <div className="ProgressBar">
      </div>
    );
  }
}

class FormInput extends Component {
  render() {
    return (
      <div className="FormInput">
        <form onSubmit={this.props.onSubmit}>
          <input type="text" name="task" value={this.props.task} placeholder={this.props.placeholderTask} />
          <input type="number" name="time" value={this.props.time} placeholder={this.props.placeholderTime} />
          <input id="submit-button" type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholderTask: 'Add a new task...',
      placeholderTime: 'Work intervals...',
      task: '',
      time: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
}

  handleSubmit(event) {

    alert('Task: ' + this.state.task + '\nTime: ' + this.state.time);
    event.preventDefault();
  }

  render() {
    return (
      <div className="Form">
        <FormInput placeholderTask={this.state.placeholderTask}
        placeholderTime={this.state.placeholderTime} task={this.state.task}
        time={this.state.time} onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <ProgressBar />
        <Form />
      </div>
    );
  }
}

export default App;
