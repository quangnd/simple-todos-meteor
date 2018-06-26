import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
 
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import ReactDOM from 'react-dom';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      taskInput: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      taskInput: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    //const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const text = this.state.taskInput;
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
    
    this.setState({
      taskInput: ''
    })
    // Clear form
    //ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List 😈</h1>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              value={this.state.taskInput} onChange={this.handleChange}
              placeholder="Type to add new tasks"
            />
          </form>
        </header>
        
        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
