import { NavLink } from "react-router-dom";
import "./header.scss";

function Header() {
  return (
    <header className="header-component _padding-x">
      <p className="title">University List App</p>
      <ul className="nav-items">
        <li className="item">
          <NavLink exact to="/" activeClassName="selected">
            Home
          </NavLink>
        </li>
        <li className="item">
          <NavLink to="/universities" activeClassName="selected">
            Universities
          </NavLink>
        </li>

        <li className="item">
          <NavLink to="/countries" activeClassName="selected">
            Countries
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
