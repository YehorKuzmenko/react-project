import './App.css';
import React from 'react';
import Header from './Header';
import Footer from "./Footer";
import ModalComponent from "./Modal";

import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import WorkIcon from '@mui/icons-material/WorkOutline';
import ImportantIcon from '@mui/icons-material/WarningAmber';
import EmailIcon from '@mui/icons-material/MailOutline';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {name: 'Task 1', done: false, category: 'work', date: '2021-10-10'},
        {name: 'Task 2', done: false, category: 'email', date: '2021-10-10'},
        {name: 'Task 3', done: false, category: 'important',date: '2021-10-10' },
        {name: 'Task 4', done: false, category: 'work', date: '2021-10-10' }
      ],
      search: '',
      showModal: false,
      currentTask: null,
      headerOpacity: 1
    };
  }
    componentDidMount() {
        const userConfirmation = window.confirm("Do you want to load the tasks from localStorage?");
        if (userConfirmation) {
            this.loadTasks();
        }
    }

  countTasks() {
      const tasks = this.filterTasks(this.state.search);
      let total = tasks.length;
      let done = tasks.filter(task => task.done).length;
      let toDo = total - done;

      return (
          <div>
            <p>Total tasks: {total}</p>
            <p>Tasks done: {done}</p>
            <p>Tasks to do: {toDo}</p>
          </div>
      );
  }

    filterTasks = (search) => {
        return this.state.tasks.filter(task => search.length < 3 || task.name.includes(search));
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
      if (value.trim().length >= 3 || value.trim().length === 0) {
          this.setState({ headerOpacity: 1 });
      } else if (value.trim().length < 3 && value.trim().length > 0) {
          this.setState({ headerOpacity: 0.5 });
      }

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

    handleAddUpdateTask = (title, category, date) => {
        if (this.state.currentTask) {
            if(title.trim() === '') {
                return;
            }
            this.setState(prevState => {
                const tasks = prevState.tasks.map((item, index) => {
                    if (index === prevState.currentTask.index) {
                        return {name: title, done: item.done, category: category, date: date};
                    } else {
                        return item;
                    }
                });
                return {tasks, currentTask: null};
            });
        } else {
            if(title.trim() === '') {
                return;
            }
            this.setState(prevState => {
                const tasks = [...prevState.tasks, {name: title, done: false, category: category, date: date}];
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
                <Header
                    tasks={this.countTasks()}
                    opacity={this.state.headerOpacity}
                />
                <ModalComponent
                    show={this.state.showModal}
                    handleClose={() => this.setState({showModal: false, currentTask: null})}
                    name={this.state.currentTask ? this.state.currentTask.name : ''}
                    handleAddUpdateTask={this.handleAddUpdateTask}
                    category={this.state.currentTask ? this.state.currentTask.category : ''}
                />
                <h1>Tasks</h1>
                <ul>
                    {this.filterTasks(this.state.search).map((task, index) => (
                        <li key={index} className={task.done ? 'done' : ''}>
                            {
                                task.category === 'work' && <WorkIcon /> ||
                                task.category === 'important' && <ImportantIcon /> ||
                                task.category === 'email' && <EmailIcon />
                            }
                            <input type="checkbox" checked={task.done} onChange={() => this.toggleTasksDone(index)}></input>
                            {task.name}
                            {task.date && <p>({new Date(task.date).toLocaleDateString('en-GB')})</p>}

                            <ArrowUpwardIcon onClick={() => this.moveTaskUp(index)} />
                            <ArrowDownwardIcon onClick={() => this.moveTaskDown(index)} />
                            <EditIcon onClick={() => this.setState({showModal: true, currentTask: {name: task.name, index}})}>Edit</EditIcon>
                            <DeleteIcon onClick={() => this.deleteTask(index)} />
                            {new Date() > new Date(task.date) && <p>It is too late ;(</p>}
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