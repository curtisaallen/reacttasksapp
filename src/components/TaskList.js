import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTask } from '../actions';
import { bindActionCreators } from 'redux';

class TaskForm extends Component {
  componentDidMount() {
    this.props.getTask();
  }  
  handleEdit(id) {
     this.props.onEditTask(id);
  } 
  emptyMessage() {
    if(this.props.items.tasks){
     if(this.props.items.tasks.length === 0) {
       return <p className="empty-message">Please add a task to get started!</p>;
     }
    }  
  }
  renderData = (data) => {
    if(data) {
      return data.map((task, index) => {
        return <li key={task.id} onClick={() => this.handleEdit(index)} className={"list-group-item list-border-bottom " + (task.type === 'bug' ? 'list-group-item-danger' : '')} >{task.name} <span className="pull-right">{task.created_at}</span></li>
      });
    } 
  }  
  render () {
    console.log(this.props.items.tasks ,'hey');
    const listItems = this.props.tasks.map((task, index) => <li key={task.id} onClick={() => this.handleEdit(index)} className={"list-group-item list-border-bottom " + (task.type === 'bug' ? 'list-group-item-danger' : '')} >{task.name} <span className="pull-right">{task.created_at}</span></li>) 
    return (
      <div>
        <ol className="list-group">
            {this.renderData(this.props.items.tasks)}
        </ol>        
         {this.emptyMessage()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state);
    return {
      items: state
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTask }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
