import './App.css';
import React from 'react';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: ''
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

  render() {
    return (
        <div className="App">
          <Header tasks={this.countTasks()}/>
          <div>Tasks</div>
        </div>
    );
  }
}

export default App;