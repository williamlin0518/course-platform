import React, { useState, useEffect } from "react";
import logo from "../ui/Tsmc.svg.png";
import { NavLink } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

function Sidebar() {
  const [nav, setNav] = useState([
    { label: "Home", slug: "/", icon: "icon-home" },
    { label: "Discover", slug: "/discover", icon: "icon-ul" }, // Changed to absolute path
    { label: "Categories", slug: "/cates", icon: "icon-tag" }, // Changed to absolute path
    { label: "My Courses", slug: "/my-courses", icon: "icon-briefcase" }, // Changed to absolute path
  ]);
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [initiateSignOut, setInitiateSignOut] = useState(false);

  useEffect(() => {
    if (initiateSignOut) {
      signOut().then(() => setInitiateSignOut(false));
    }
  }, [initiateSignOut, signOut]);

  const navigation = nav.map((item, index) => (
    <li key={"nav-" + index + "-" + item.slug}>
      <NavLink to={item.slug} className={"aic link noul flex c333"}>
        <div className={"ico s20 " + item.icon} />
        <h2 className="lbl s20">{item.label}</h2>
      </NavLink>
    </li>
  ));

  return (
    <div className="sidebar rel">
      <a href="#" className="logo bl">
        <div className="cont">
          <img src={logo} className="bl logoImg" alt="Logo" />
          <div className="logoText">
            <h3 className="page-title s20 fontb c333">TSMC Learning</h3>
          </div>
        </div>
      </a>

      <ul className="nav">{navigation}</ul>

      <div className="me flex aic">
        {isSignedIn ? (
          <NavLink
            to="/"
            onClick={() => setInitiateSignOut(true)}
            className={"aic link noul flex c333"}
          >
            <div className={"ico s24 rel cfff icon-portrait-male"} />
            <h2 className="lbl s20 fontb">Log out</h2>
          </NavLink>
        ) : (
          <NavLink to="/login" className={"aic link noul flex c333"}>
            <div className={"ico s24 rel cfff icon-portrait-male"} />
            <h2 className="lbl s20 fontb">Sign in</h2>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
