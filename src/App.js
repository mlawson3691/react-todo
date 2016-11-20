import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import * as firebase from 'firebase';
import Rebase from 're-base';

var base = Rebase.createClass({
  apiKey: "AIzaSyBksdy8GwgHaur39OrM_OPRFoKzOvqjTS0",
  authDomain: "react-first-4fb71.firebaseapp.com",
  databaseURL: "https://react-first-4fb71.firebaseio.com",
  storageBucket: "react-first-4fb71.appspot.com",
  messagingSenderId: "523141866521"
});

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <br />
        <ToDoList />
      </div>
    );
  }
}

// class Greeting extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {value: ''};
//   }
//
//   _handleChange(event) {
//     this.setState({value: event.target.value});
//   }
//
//   _handleSubmit(event) {
//     event.preventDefault();
//   }
//
//   render() {
//     var printedGreeting;
//     if (this.state.value) {
//       printedGreeting = `Hello, ${this.state.value}!`
//     } else {
//       printedGreeting = 'Hello!'
//     }
//     return (
//       <div>
//         <form onSubmit={this._handleSubmit}>
//           <label>Enter your name: </label>
//           <input type='text' value={this.state.value} onChange={this._handleChange.bind(this)} />
//         </form>
//         <h2>{printedGreeting}</h2>
//       </div>
//     );
//   }
// }

class ToDoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTask: '',
      tasks: [],
      complete: false
    };
  }

  componentDidMount() {
    base.syncState('tasks', {
      context: this,
      state: 'tasks',
      asArray: true
    });
  }

  _handleChange(event) {
    this.setState({newTask: event.target.value});
  }

  _addTask(event) {
    event.preventDefault();
    base.push('tasks', {
      data: {text: this.state.newTask, complete: false}
    });
    this.setState({newTask: ''});
  }

  _completeTask(index, event) {
    event.stopPropagation();
    var allTasks = this.state.tasks;
    allTasks[index].complete = !allTasks[index].complete;
    this.setState({tasks: allTasks});
  }

  _changeDisplay(event) {
    event.stopPropagation();
    var newState = !this.state.complete;
    this.setState({complete: newState});
  }

  render() {
    return (
      <div>
        <h2>To Do List:</h2>
        <form onSubmit={this._addTask.bind(this)}>
          <label>Add a Task: </label>
          <input type='text' value={this.state.newTask} onChange={this._handleChange.bind(this)} />
          <button type='submit'>Add</button>
        </form>
        <br />
        <ChangeDisplay
          complete={this.state.complete}
          changeDisplay={this._changeDisplay.bind(this)}
        />
        {this.state.tasks.map( (task, index) => {
          if (task.complete === this.state.complete) {
            return (
              <Task
                task={task}
                key={index}
                completeTask={this._completeTask.bind(this, index)}
              />
            );
          } else {
            return '';
          }
        }, this)}
      </div>
    );
  }
}

class Task extends Component {
  render() {
    return (
      <div key={this.key}>
        {this.props.task.text} &nbsp;
        <button onClick={this.props.completeTask.bind(null)}>X</button>
      </div>
    );
  }
}

class ChangeDisplay extends Component {
  render() {
    let buttonText, titleText;
    if (this.props.complete === false) {
      titleText = 'Incomplete Tasks';
      buttonText = 'Show Completed Tasks';
    } else {
      titleText = 'Completed Tasks';
      buttonText = 'Show Incomplete Tasks';
    }
    return (
      <div>
        <button onClick={this.props.changeDisplay.bind(null)}>{buttonText}</button>
        <br />
        <h3>{titleText}</h3>
      </div>
    );
  }
}

export default App;
