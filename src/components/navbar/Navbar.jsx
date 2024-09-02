import React from "react";
import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  const fetch = useNotificationStore((state) => state.fetch);
  // const number = useNotificationStore((state) => state.number);
  const number = 3;

  if(currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>EliteEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contactus">Contact</a>
        {/* <a href="/">Agents</a> */}
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              // src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              src={ currentUser.avatar ||"/noavatar.jpg"} 
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
             <a href="/login">Sign in</a>
             <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src={"/menu.png"}
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contactus">Contact</a>
          {/* <a href="/">Agents</a> */}
          {!currentUser && <a href="/login">Sign in</a>}
          {!currentUser && <a href="/register">Sign up</a>}
          {currentUser && <a href="/profile">Profile</a>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
