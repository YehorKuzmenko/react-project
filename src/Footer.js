function Footer({handleSearchInput, showAddTask}) {
  return (
    <footer>
      <input type="text" placeholder="Search" onChange={event => handleSearchInput(event.target.value)}></input>
      <button onClick={showAddTask}>Add Task</button>
    </footer>
  );
}

export default Footer;
