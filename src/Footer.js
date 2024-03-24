function Footer({handleSearchInput}) {
  return (
    <footer>
      <input type="text" placeholder="Search" onChange={event => handleSearchInput(event.target.value)}></input>
      <button>Add Task</button>
    </footer>
  );
}

export default Footer;
