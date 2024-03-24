function Header({tasks, opacity}) {
    return (
        <header style={{opacity : opacity}}>
            {tasks}
        </header>
    );
}

export default Header;