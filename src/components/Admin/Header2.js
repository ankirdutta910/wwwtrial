import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import "../../App.css";

function Header() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{
          backgroundColor: "#fff",
          minHeight: "70px",
          WebkitBoxShadow: "0px 3px 10px -5px rgba(0,0,0,1)",
          MozBoxShadow: "0px 3px 10px -5px rgba(0,0,0,1)",
          boxShadow: "0px 3px 10px -5px rgba(0,0,0,1)",
        }}
      >
        <div className="container-fluid" style={{ maxWidth: "210vh" }}>
          <Link className="navbar-brand">
            <span
              style={{
                fontSize: "28px",
                color: "#212A3E",
                fontWeight: "bold",
                fontFamily: "montserrat",
              }}
            >
              <i class="fa fa-user-circle" aria-hidden="true"></i> ADMIN PORTAL
            </span>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <p
                  style={{
                    textAlign: "right",
                    color: "white",
                    marginTop: "9px",
                  }}
                >
                  {date.toLocaleDateString()} | {date.toLocaleTimeString()}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
