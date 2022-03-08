import React, { Component } from 'react';
import './App.css';

export default class Todo extends Component {

  state = {
    task:"",
    taskList: []
  };

  handleChange = (e) => {
    this.setState({
      task: e.target.value
    })
  };

  add = (e) => {
    let {task, taskList} = this.state
    if (task !== ""){
      this.setState({
        taskList: taskList.concat({
          task: task,
          id: Date.now()
        }),        
      task: ""
      })
    };
  };

  remove = (id) => {
    let { taskList } = this.state;
    this.setState({
      taskList: taskList.filter((item) => item.id !== id)
    })
  };

  render(){
    let {add, remove, handleChange} = this;
    let {task, taskList,} = this.state;

    return(
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='container'>
          <h1>O que temos pra hj?</h1>
          <div className='input'>
            <input placeholder='Type the task here' value={task} onChange={handleChange}></input>
            <button onClick={add}>Add task</button>
          </div>
          <div className='list'>
            {taskList.map((item) => 
              <ul>
                <li>
                  {item.task}
                  <button onClick={() => remove(item.id)}>Remove</button>
                </li>
              </ul>
            )}
          </div>
        </div>      
      </form>
    )
  }
}