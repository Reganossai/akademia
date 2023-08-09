import React from "react";
import { faChartSimple, faGraduationCap, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-div">
      <nav>
        <ul>
          
          <li id="dash">
            <NavLink  activeClassName="active" to="/dashboard">
            <span> <FontAwesomeIcon icon={faChartSimple} className="fontawesome-sidebar"/></span>Dashboard
            </NavLink>
          </li>
          <li  id="adm">
            <NavLink activeClassName="active" to="/admission">
             <span> <FontAwesomeIcon icon={faGraduationCap} className="fontawesome-sidebar"/></span>Admission
            </NavLink>
          </li>
          <li id="prof" >
            <NavLink  activeClassName="active" to="/login">
            <span> <FontAwesomeIcon icon={faUserPen} className="fontawesome-sidebar"/></span>Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
