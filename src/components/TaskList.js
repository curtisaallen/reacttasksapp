import React, { Component } from 'react';

class TaskForm extends Component {
  handleEdit(id) {
     this.props.onEditTask(id);
  } 
  emptyMessage() {
     if(this.props.tasks.length === 0) {
       return <p className="empty-message">Please add a task to get started!</p>;
     }  
  }
  render () {
    const listItems = this.props.tasks.map((task, index) => <li key={task.id} onClick={() => this.handleEdit(index)} className={"list-group-item list-border-bottom " + (task.type === 'bug' ? 'list-group-item-danger' : '')} >{task.name} <span className="pull-right">{task.created_at}</span></li>) 
    return (
      <div>
        <ol className="list-group">
          {listItems}
        </ol>
         {this.emptyMessage()}
      </div>
    )
  }
}

export default TaskForm;