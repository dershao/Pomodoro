import React, { Component } from 'react';
import './index.css';

class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: 25,
      seconds: 0,
    };
  }

  tick() {
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;

    seconds--;
    if(seconds < 0)
    {
      seconds = 59;
      minutes--;
    }

    if(minutes === -1 && seconds === 59)
    {
      clearInterval(this.clock);
      minutes = 25;
      seconds = 0;
      this.props.timerFinished();
    }
    this.setState({minutes: minutes, seconds: seconds});
  }

  renderTime() {
    const seconds = this.state.seconds;
    const minutes = this.state.minutes;

    const secondsDisplay = seconds < 10 ? '0' + seconds : seconds;
    const minutesDisplay = minutes < 10 ? '0' + minutes : minutes;

    return <div>{minutesDisplay}:{secondsDisplay}</div>;
  }

  componentDidMount() {
    this.clock = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clock);
  }

  render() {
      return (
        <div className="Clock">
          {this.renderTime()}
        </div>
      );
  }
}

class Timer extends Component {
  render() {
    return (
      <div className="Timer">
        {this.props.start ? <Clock timerFinished={this.props.timerFinished}/> : <div>25:00</div>}
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

 function Form(props) {
  return (
    <div className="Form">
      <form onSubmit={props.onSubmit}>
        <input type="text" name="task" value={props.task}
        placeholder="Add a new task..." onChange={props.onChange} />
        <input type="number" name="time" value={props.time}
        placeholder="Work intervals..." onChange={props.onChange} />
        <input id="submit-button" type="submit" value="Submit"/>
      </form>
    </div>
  );
}

function TaskButton(props) {

}

function TaskList(props) {
  const tasks = props.tasks;
  const taskList = tasks.map((task) => {
    return (
      <div>{task}
        <button type="button" id="start-button" onClick={props.onClick}>
          Start Task
        </button>
      </div>
    );
  });

  return <ul>{taskList}</ul>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: '',
      time: '',
      timerStart: false,
      tasks: [],
      numTasks: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.timerFinished = this.timerFinished.bind(this);
  }
  componentDidMount() {

    //using XHR request instead - fetch appears to be bugged
    var getDataReq = new XMLHttpRequest();
    getDataReq.onreadystatechange = function() {
      if (getDataReq.readyState == XMLHttpRequest.DONE) {
        alert(getDataReq.responseText);
      }
    }
    getDataReq.open("GET", "http://localhost:5000/");
    getDataReq.send();

    //fetch API is bugged - gives you a TypeError https://github.com/github/fetch/issues/310
    /*
    fetch('http://localhost:5000/')
      .then(function(res) {
        console.log(res.json());
        console.log(res.text());
      })
      .then(function(data) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      });*/
  }

  handleSubmit(event) {
    if(!this.state.task || !this.state.time)
    {
      alert('All fields are required');
      return;
    }

    const tasks = this.state.tasks;
    const task = this.state.task;
    const numTasks = this.state.numTasks;
    this.setState({tasks: tasks.concat([task]), numTasks: numTasks + 1});

    // TODO: POST to server
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleClick(event) {
    this.setState({timerStart: this.state.timerStart ? false : true});
  }

  timerFinished() {
    this.setState({timerStart: false});
    alert("25 Minutes Completed");
  }

  render() {
    return (
      <div className="App">
        <h1>Pomodoro</h1>
        <Timer start={this.state.timerStart} timerFinished={this.timerFinished}
        />
        <ProgressBar />
        <Form onSubmit={this.handleSubmit} onChange={this.handleChange}
        task={this.state.task} time={this.state.time} />
        <TaskList tasks={this.state.tasks} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
