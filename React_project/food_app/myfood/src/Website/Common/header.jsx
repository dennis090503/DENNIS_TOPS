import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header_section">
      <div className="container">
        <nav className="navbar navbar-expand-lg custom_nav-container">

          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <span>Feane</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
          >
            <span></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            {/* Navigation Links */}
            <ul className="navbar-nav mx-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/menu">Menu</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>

            </ul>

            {/* Right Side Icons */}
            <div className="user_option">

              <a href="#" className="user_link">
                <i className="fa fa-user" aria-hidden="true"></i>
              </a>

              <Link className="cart_link" to="/cart">
                🛒
                </Link>

              <form className="form-inline">
                <button className="btn nav_search-btn" type="submit">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </form>

              <a href="#" className="order_online">
                Order Online
              </a>

            </div>

          </div>
        </nav>
      </div>
    </header>
  );
}