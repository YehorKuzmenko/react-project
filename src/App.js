import './App.css';
import React from 'react';
import Header from './Header';
import Footer from "./Footer";
import ModalComponent from "./Modal";

import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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

    moveTaskUp = (index) => {
        this.setState(prevState => {
            if (index === 0) {
                return prevState;
            }
            const tasks = [...prevState.tasks];
            const temp = tasks[index];
            tasks[index] = tasks[index - 1];
            tasks[index - 1] = temp;
            return { tasks };
        });
    }

    moveTaskDown = (index) => {
        this.setState(prevState => {
            if (index === prevState.tasks.length - 1) {
                return prevState;
            }
            const tasks = [...prevState.tasks];
            const temp = tasks[index];
            tasks[index] = tasks[index + 1];
            tasks[index + 1] = temp;
            return { tasks };
        });
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

    saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    }

    loadTasks = () => {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            this.setState({tasks: JSON.parse(tasks)});
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
                                <ArrowUpwardIcon onClick={() => this.moveTaskUp(index)} />
                                <ArrowDownwardIcon onClick={() => this.moveTaskDown(index)} />
                                <EditIcon onClick={() => this.setState({showModal: true, currentTask: {name: task.name, index}})}>Edit</EditIcon>
                                <DeleteIcon onClick={() => this.deleteTask(index)} />
                            </li>
                        ))}
                </ul>
                <Footer
                    loadTasks={this.loadTasks}
                    saveTasks={this.saveTasks}
                    showAddTask={() => this.setState({showModal: true})}
                    handleSearchInput={this.handleSearchInput}
                />
            </div>
        );
    }
}

export default App;