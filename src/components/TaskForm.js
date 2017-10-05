import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions';
import { bindActionCreators } from 'redux';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        taskType: [],
        select: '',
        name: '',
        description: '',
        formErrors: {name: '', description: ''},
        nameValid: false,
        descriptionValid: false,
        formVaild: false
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
      this.setState({[name]: value}, () => { this.validateField(name, value) });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let descriptionValid = this.state.descriptionValid;
    switch(fieldName) {
      case 'name':
        nameValid = value.length >= 25;
        fieldValidationErrors.name = nameValid ? '': ' Name field needs to grater than 25 characters';
        break;
      case 'description':
        descriptionValid = value.length >= 2;
        fieldValidationErrors.description = descriptionValid ? '': `Description field needs to grater than 2 characters`;
        break;
      default:
        break;
    }   
    this.setState({formErrors: fieldValidationErrors,
                  nameValid: nameValid,
                  descriptionValid: descriptionValid
                }, this.validateForm);    
  }
  
  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.descriptionValid});
  }

  errorMessage(value){
     if(value.length) {
       return <div className="panel panel-default"><div className='formErrors'>{value}</div></div>;
    }  
  }
  currentDate() {
    let today = new Date();
    let dd = today.getDate();
    let yyyy = today.getFullYear();
    let month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    if(dd<10) { dd='0'+dd;} 
    let n = today.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    today = `Created ${n} on ${month[today.getMonth()]} ${dd} ${yyyy}`;
    return today
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.addTask({
      id: this.props.tasks.length + 1,
      name: this.state.name,
      type: this.state.select ? this.state.select : 'general',
      description: this.state.description,
      created_at: this.currentDate()
    });
    this.setState({
        select: '',
        name: '',
        description: ''   
    })
  }
  render () {
    return (
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
            <input type="text" name="name" ref={(name) => this.name = name} value={this.state.name} onChange={(event) => this.handleUserInput(event)} className="form-control" />
            {this.errorMessage(this.state.formErrors.name)} 
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
             {this.errorMessage(this.state.formErrors.description)}              
       </div>

        <button className="button tiny success btn btn-primary" disabled={!this.state.formValid} onClick={(event) => this.onSubmit(event)}>Save</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTask }, dispatch);
}
export default connect(null, mapDispatchToProps)(TaskForm);