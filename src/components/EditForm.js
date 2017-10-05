import React, { Component } from 'react';

export default class EditForm extends Component {
 constructor(props) {
    super(props);
    this.state = {
        taskType: [],
        id: this.props.taskupdate.id,
        select: this.props.taskupdate.type,
        name: this.props.taskupdate.name,
        description: this.props.taskupdate.description,
        formErrors: {name: '', description: ''},
        nameValid: false,
        descriptionValid: false,
        formVaild: false,
        isRemove: false,
        taskpos: ""
    }
  } 
  componentDidMount() {
    this.getTaskType();
  } 
  getTaskType = () => {
    fetch('task_types.json', {
        method: 'GET'
    }).then(response => response.json()).then(
      (data) => {
          this.setState({
            taskType: data
          });
    })
  }
  handleUserInput(event) {
          const name = event.target.name;
          const value = event.target.value;
          this.setState({[name]: value});
  }
  handleRemove(event) {
    event.preventDefault();
    this.props.handleRemove(this.props.taskIndex);
  }
  showModal(event){
    event.preventDefault();
    this.setState({
         isRemove: true
    })
  }
  onSave(event) {
    event.preventDefault();  
    let newVal = {
      id: this.state.id,
      name: this.state.name,
      type: this.state.select,
      description: this.state.description
    };
    this.props.onUpdatTask(this.props.taskIndex, newVal);
  }
  onCancel(event) {
     event.preventDefault(); 
     this.setState({
         isRemove: false,
    })
  }
  showModalMessage() {
        if(this.state.isRemove) {
          return (
              <div className="popup" id="popup1">
                  <div className="reactmodal-content">
                      <h3>Warning:</h3>
                      <p>Are you sure you want to delete this task?</p>
                      <button className="btn btn-primary btn-remove" onClick={(event) => this.handleRemove(event)}>Yes, delete this wretched task.</button>
                      <button className="btn btn-primary btn-cancel" onClick={(event) => this.onCancel(event)}>Cancel</button>
                  </div>
              </div>   
          )
        }
  }       
  render () { 
    console.log('EditForm should update');
    return (
      <div>  
        <form>
            <div className="form-group">
                <label htmlFor="tasktype">Type of Task</label>
                <select name="select" ref="select" value={this.state.select} onChange={(event) => this.handleUserInput(event)}  className="form-control">
                {this.state.taskType.map((item, index) => {
                    return <option value={item.name} key={index}>{item.label}</option>;
                })}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="name">Task Name</label>
                <input type="text" name="name" value={this.state.name} onChange={(event) => this.handleUserInput(event)} className="form-control" />
            </div>

            <div className="form-group">
                <label htmlFor="description">Task Description</label>
                <textarea 
                    className="form-control"
                    name="description"
                    ref="description"
                    value={this.state.description}
                    onChange={(event) => this.handleUserInput(event)}
                    ></textarea>             
            </div>

            <button className="button tiny success btn btn-primary btn-red" onClick={(event) => this.onSave(event)}>Save</button>
            <button className="button tiny success btn btn-primary" onClick={(event) => this.showModal(event)}>Delete</button>
        </form>
        {this.showModalMessage()}  
      </div>
    )
  }
}