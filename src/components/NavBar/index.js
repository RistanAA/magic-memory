import './style.css'

const NavBar = () => {
    return (
        <nav className='nav-bar'>
            <a href="/" className="brand-name">
                Memory Game
            </a>
            <div className="navigation-menu">
                <ul>
                    <li>
                        <a href="/home">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar