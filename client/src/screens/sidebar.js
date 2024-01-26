import React, { useState } from "react";
import logo from "../ui/Tsmc.svg.png";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const [nav, setNav] = useState([
    { label: "Home", slug: "/", icon: "icon-home" },
    { label: "Discover", slug: "discover", icon: "icon-ul" },
    { label: "Categories", slug: "cates", icon: "icon-tag" },
    { label: "My Courses", slug: "my-courses", icon: "icon-briefcase" },
  ]);
  const [currentPage, setCurrentPage] = useState("/");

  var navigation = [];
  for (let i = 0; i < nav.length; i++) {
    navigation.push(
      <li key={"nav-" + i + "-" + nav[i].slug}>
        <NavLink to={nav[i].slug} className={"aic link noul flex c333"}>
          <div className={"ico s20 " + nav[i].icon} />
          <h2 className="lbl s20">{nav[i].label}</h2>
        </NavLink>
      </li>
    );
  }

  return (
    <div className="sidebar rel">
      <a href="#" className="logo bl">
        <div className="cont">
          <img src={logo} className="bl logoImg" />
          <div className="logoText">
            <h3 className="page-title s20 fontb c333">TSMC Learning</h3>
          </div>
        </div>
      </a>

      <ul className="nav">{navigation}</ul>

      <div className="me flex aic">
        <NavLink to={"oauth"} className={"aic link noul flex c333"}>
          <div className={"ico s24 rel cfff icon-portrait-male"} />
          <h2 className="lbl s20 fontb">Sign in</h2>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
