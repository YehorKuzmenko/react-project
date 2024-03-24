function Footer({handleSearchInput, showAddTask, saveTasks, loadTasks}) {
  return (
    <footer>
      <button onClick={saveTasks}>Save Tasks</button>
      <button onClick={loadTasks}>Load Tasks</button>
      <input type="text" placeholder="Search" onChange={event => handleSearchInput(event.target.value)}></input>
      <button onClick={showAddTask}>Add Task</button>
    </footer>
  );
}

export default Footer;
