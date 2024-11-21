/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      edit: { editMode: false, todoName: ""} 
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.changeTask = this.changeTask.bind(this);
  }

  handleEditChange(toggle, todo) {
    this.setState((state) => ({
      ...state,
      edit: {editMode: toggle, todoName: todo}
    }))
  }

  changeTask(oldTodo, newTodo) {
    const tempCopy = this.state.todos;

    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i] === oldTodo) {
        tempCopy.splice(i,1,newTodo);
        this.setState(state => ({
          todos: tempCopy,
          ...state,
        }));
        this.handleEditChange(false, "")
        break
      }
    }
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  deleteTask(todo) {
    const tempCopy = this.state.todos;
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i] === todo) {
        tempCopy.splice(i,1);
        this.setState(state => ({
          todos: tempCopy,
          ...state,
        }));
        break
      }
    }
  }

  render() {
    return (
      <section>
        {/* eslint-disable-next-line react/prop-types */}
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
            disabled={this.state.edit.editMode}
          />
          <button type="submit" disabled={this.state.edit.editMode}>Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <ul>
          {this.state.todos.map((todo) => (
            <ListItem todo={todo} state={this.state} key={todo} deleteTask={this.deleteTask} edit={this.handleEditChange} changeTask={this.changeTask}/>
          ))}
        </ul>
        <Count count={this.state.todos.length}/>
      </section>
    );
  }
}


class Count extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<span>Task Count: {this.props.count}</span>)
  }
}



class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: this.props.todo
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  render() {
    if (this.props.state.edit.editMode && this.props.todo === this.props.state.edit.todoName) {
      return (
        <li>
          <input
            type="text"
            value={this.state.inputVal}
            key={this.props.todo}
            onChange={this.handleInputChange}
          />
          <button type="button" onClick={() => this.props.changeTask(this.props.todo, this.state.inputVal)}>Resubmit</button>
        </li>
      );
    }

    if (this.props.state.edit.editMode) {
      return (
        <li key={this.props.todo}>
          {this.props.todo}
        </li>
      );
    }

    return (
      <li key={this.props.todo}>
        {this.props.todo} 
        <button type="button" onClick={() => this.props.deleteTask(this.props.todo)}>Delete</button>
        <button type='button' onClick={() => this.props.edit(true,this.props.todo)}>
          Edit
        </button>
      </li>
    );
  }

}


export default ClassInput;
