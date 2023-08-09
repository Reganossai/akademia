import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav id="menu-menu">
        <ul>
      <li>
        <NavLink activeClassName="active" to="/personal-information">Personal Information</NavLink>
      </li>
      <li>
        <NavLink activeClassName="active"  to="/guardian-information">Guardian/Parent Information</NavLink>
      </li>

      <li>
        <NavLink activeClassName="active"  to="/previous-education">Previous Education</NavLink>
      </li>
      </ul>
    </nav>
  );
};

export default Menu;
