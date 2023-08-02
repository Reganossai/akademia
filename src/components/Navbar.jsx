import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple, faGraduationCap, faUserPen } from "@fortawesome/free-solid-svg-icons";
import image from "../assets/image 1.png";
import reagan from "../assets/reagan.jpg";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  nav
    ? (document.body.style.overflowX = "hidden")
    : (document.body.style.overflow = "auto");
  return (
    <div className="nav-usa">
      <nav className="navbar navbar-expand-lg">
        <Link to="/">
          <img src={image} className="logoo" alt="logoo" />
        </Link>

        <h2 className="powerfield">Powerfields Group of School</h2>

        <div id="navbarSupportedContent">
          <ul>
            <li className="nav-link">
              <img src={reagan} className="reg" alt="user" />
              <span className="user-name"> Omoade Mary</span>
            </li>

            <div onClick={handleNav} className="zaracho">
              {nav ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </div>
          </ul>

          {nav ? (
            <div id="navbarSupportedContentMobile">
              <ul>
                <li id="dash">
                  <NavLink activeClassName="active" to="/dashboard">
                  <span> <FontAwesomeIcon icon={faChartSimple} className="fontawesome-sidebar"/></span> Dashboard
                  </NavLink>
                </li>
                <hr className="hop" />
                <li id="adm">
                  <NavLink activeClassName="active" to="/admission">
                  <span> <FontAwesomeIcon icon={faGraduationCap} className="fontawesome-sidebar"/></span>  Admission
                  </NavLink>
                </li>

                <hr className="hop" />
                <li id="prof">
                  <NavLink activeClassName="active" to="/login">
                  <span> <FontAwesomeIcon icon={faUserPen} className="fontawesome-sidebar"/></span>  Profile
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
