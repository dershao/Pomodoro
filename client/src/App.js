import React, { Component } from 'react';
import './index.css';
import $ from 'jquery';

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

 function TaskInput(props) {
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

function TaskList(props) {
  const tasks = props.tasks;
  const taskList = tasks.map((task, index) => {
    return (
      <li key={index}>{task.item}
        <button type="button" id="start-button" name={task.item} onClick={props.onClick}>
          {task.inProgress ? "Stop Task" : "Start Task"}
        </button>
      </li>
    );
  });

  return <div id="tasklist">{taskList}</div>;
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
    $.ajax({
        dataType: "json",
        url: "http://localhost:5000",
        success: function(data) {
          let taskList = [];

          data.forEach(function(task) {
            if(task.item)
            {
              taskList.push(task);
            }
          });

          // Adds one more field to each task

          taskList.forEach(function(task) {
            task.inProgress = false;
          });

          this.setState({tasks: taskList});

      }.bind(this),
    });
  }

  handleSubmit(event) {
    if(!this.state.task || !this.state.time)
    {
      alert('All fields are required');
      return;
    }

    const tasks = this.state.tasks;
    const task = this.state.task;

    // TODO: POST to server
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleClick(event) {
    const taskList = this.state.tasks;

    alert(event.target.name);

    for(let i = 0; i < taskList.length; i++)
    {
      if(taskList[i].item === event.target.name)
      {
        taskList[i].inProgress = taskList[i].inProgress ? false : true;
        break;
      }
    }
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
        <TaskInput onSubmit={this.handleSubmit} onChange={this.handleChange}
        task={this.state.task} time={this.state.time} />
        <TaskList tasks={this.state.tasks} onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
