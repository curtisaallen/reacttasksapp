import React, { Component } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import EditForm from './EditForm';

const task = {
      id: 1,
      name: 'Adding Zip Code Field to Form',
      type: 'general',
      description: 'bar',
      created_at: 'Created 4:59 PM on October 01 2017'
    };
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [task],
      isEditing: false
    }
  }
  onAddTask(value) {
     this.setState({
       tasks: this.state.tasks.concat(value)
     })
  }
  onUpdatTask(index, value){
    let {tasks} = this.state;
    tasks[index].name = value.name;
    tasks[index].description = value.description;
    tasks[index].type = value.type;
    this.setState({tasks, isEditing: false})
  }  
  onRemoveTask(index){
    this.setState({
         tasks: this.state.tasks,
         isRemove: true,
         taskpos: index,
         isEditing: false
    })
    
  }
  handleRemove(index) {
    this.state.tasks.splice(index, 1);
    this.setState({
         tasks: this.state.tasks,
         isRemove: false,
         isEditing: false
    })  
  }
  onEditTask(index) {
    this.setState({
      taskupdate: this.state.tasks[index],
      isEditing: true,
      taskIndex: index
    })
  }
  showTaskForm() {
   if (this.state.isEditing) {
      return (
        <EditForm taskupdate={this.state.taskupdate} taskIndex={this.state.taskIndex} handleRemove={(value) => this.handleRemove(value)} onUpdatTask={(index, value) => this.onUpdatTask(index, value)}/>
      )
    } else {
      return (
        <TaskForm onAddTask={(value) => this.onAddTask(value)} tasks={this.state.tasks} parms={this.state.taskupdate} />
      )
    }
  }
  onCancel() {
     this.setState({
         isRemove: false,
         taskpos: ""
    })
  }
  showModal() {
        if(this.state.isRemove) {
          return (
              <div className="reactmodal">
                  <div className="reactmodal-overlay">
                  <div className="reactmodal-content">
                      <h3>Warning:</h3>
                      <p>Are you sure you want to delete this task?</p>
                      <button className="btn btn-primary" onClick={() => this.handleRemove(this.state.taskpos)}>Yes, delete this wretched task.</button>
                      <button className="btn btn-primary" onClick={() => this.onCancel()}>Cancel</button>
                  </div>
                  </div>
              </div>   
          )
        }
    }    

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="container">
          <h2 className="text-center">Task Manager</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              {this.showTaskForm()}
            </div>
            <div className="col-md-7 list">
            <h2>Your Current Tasks:</h2>
            <TaskList tasks={this.state.tasks} onRemoveTask={(value) => this.onRemoveTask(value)} onEditTask={(value) => this.onEditTask(value)} />
          </div>
          </div>
        </div>
            {this.showModal()}      
      </div>
    )
  }
}



export default App;
