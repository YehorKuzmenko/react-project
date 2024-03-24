import './App.css';
import React from 'react';
import Header from './Header';
import Footer from "./Footer";

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
      search: ''
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

  render() {
      return (
          <div className="App">
              <Header tasks={this.countTasks()}/>
              <div>Tasks</div>
              <ul>
                  {this.state.tasks
                      .filter(task => this.state.search.length < 3 || task.name.includes(this.state.search))
                      .map((task, index) => (
                          <li key={index} className={task.done ? 'done' : ''}>
                              <input type="checkbox" checked={task.done} onChange={() => this.toggleTasksDone(index)}></input>
                              {task.name}
                          </li>
                      ))}
              </ul>
              <Footer handleSearchInput={this.handleSearchInput}/>
          </div>
      );
  }
}

export default App;