import './App.css';
import React from 'react';
import Header from './Header';
import Footer from "./Footer";
import Modal from './Modal';
import ModalComponent from "./Modal";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {name: 'Task 1', done: false },
        {name: 'Task 2', done: false },
        {name: 'Task 3', done: false },
        {name: 'Task 4', done: false }
      ],
      search: '',
      showModal: false,
      currentTask: null
    };
  }

  countTasks() {

      let total = this.state.tasks.length;
      let done = this.state.tasks.filter(task => task.done).length;
      let toDo = total - done;

      return (
          <div>
            <p>Total tasks: {total}</p>
            <p>Tasks done: {done}</p>
            <p>Tasks to do: {toDo}</p>
          </div>
      );
  }

  handleSearchInput = (value) => {
      this.setState({search: value});

  }

  toggleTasksDone = (index) => {
      this.setState(prevState => {
          const tasks = prevState.tasks.map((task, idx) => {
              if (idx === index) {
                  return {...task, done: !task.done};
              } else {
                  return task;
              }
          });
          return {tasks};
      });
  }

    handleAddUpdateTask = (title) => {
        if (this.state.currentTask) {
            this.setState(prevState => {
                const tasks = prevState.tasks.map((item, index) => {
                    if (index === prevState.currentTask.index) {
                        return {name: title, done: item.done};
                    } else {
                        return item;
                    }
                });
                return {tasks, currentTask: null};
            });
        } else {
            this.setState(prevState => {
                const tasks = [...prevState.tasks, {name: title, done: false}];
                return {tasks};
            });
        }
    }

    deleteTask = (index) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            this.setState(prevState => {
                const tasks = prevState.tasks.filter((item, idx) => idx !== index);
                return {tasks};
            });
        }
    }

  render() {
      return (
          <div className="App">
              <Header tasks={this.countTasks()}/>
              <ModalComponent
                show={this.state.showModal}
                handleClose={() => this.setState({showModal: false, currentTask: null})}
                name={this.state.currentTask ? this.state.currentTask.name : ''}
                handleAddUpdateTask={this.handleAddUpdateTask}
              />
              <div>Tasks</div>
              <ul>
                  {this.state.tasks
                      .filter(task => this.state.search.length < 3 || task.name.includes(this.state.search))
                      .map((task, index) => (
                          <li key={index} className={task.done ? 'done' : ''}>
                              <input type="checkbox" checked={task.done} onChange={() => this.toggleTasksDone(index)}></input>
                              {task.name}
                                <button onClick={() => this.setState({showModal: true, currentTask: {name: task.name, index}})}>Edit</button>
                                <button onClick={() => this.deleteTask(index)}>Delete</button>
                          </li>
                      ))}
              </ul>
              <Footer
                  showAddTask={() => this.setState({showModal: true})}
                  handleSearchInput={this.handleSearchInput}
              />
          </div>
      );
  }
}

export default App;