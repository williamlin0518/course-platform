import React, { useState, useEffect } from "react";
import logo from "../ui/Tsmc.svg.png";

import { NavLink } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react"; // Import useClerk

function Sidebar() {
  const [nav, setNav] = useState([
    { label: "Home", slug: "/", icon: "icon-home" },
    { label: "Discover", slug: "discover", icon: "icon-ul" },
    { label: "Categories", slug: "cates", icon: "icon-tag" },
    { label: "My Courses", slug: "my-courses", icon: "icon-briefcase" },
  ]);
  const [currentPage, setCurrentPage] = useState("/");
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  
  const [initiateSignOut, setInitiateSignOut] = useState(false);
  useEffect(() => {
    const performSignOut = async () => {
      if (initiateSignOut) {
        await signOut();
        setInitiateSignOut(false);
      }
    };

    performSignOut();
  }, [initiateSignOut, signOut]);


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
        {isSignedIn ? (
          // Display "Log out" if user is signed in
          <NavLink
            to={"/"}
            onClick={() => setInitiateSignOut(true)}
            className={"aic link noul flex c333"}
          >
            <div className={"ico s24 rel cfff icon-portrait-male"} />
            <h2 className="lbl s20 fontb">Log out</h2>
          </NavLink>
        ) : (
          // Display "Sign in" if user is not signed in
          <NavLink to={"login"} className={"aic link noul flex c333"}>
            <div className={"ico s24 rel cfff icon-portrait-male"} />
            <h2 className="lbl s20 fontb">Sign in</h2>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
