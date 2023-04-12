import { Link } from "react-router-dom";
import "./DashboardNavigation.css";
import React, { useEffect, useState } from "react";

const MainNavigation = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Super Admin") {
          setAdmin(true);
        }
      });
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <header className="header">
      <nav>
        <div className="wrapper">
          <ul className="list">
            <li>
              <Link to="/dashboard" className="text">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/userInfo" className="text">
                User Information
              </Link>
            </li>
            {admin ? (
              <li>
                <Link to="/user-lists" className="text">
                  User Lists
                </Link>
              </li>
            ) : null}
          </ul>
          <button onClick={logOut} className="logout">
            Log Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default MainNavigation;

/* ANTHONY'S CODE/TELEMETRY API CREATION & CALL FOR RETRIEVAL */

import React, { useState, useEffect } from "react";
import { parse } from "csv-parse/lib/sync";

function Telemetry() {
  const [telemetryData, setTelemetryData] = useState([]);

  useEffect(() => {
    fetch("assets/telemetries/FOX1E_rttelemetry.csv")
      .then((response) => response.text())
      .then((text) => {
        const data = parse(text);
        setTelemetryData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <details>
      <summary>
        <strong>Telemetry API Call: FOX1E_rttelemetry</strong>
      </summary>
      {telemetryData.map((row, index) => (
        <div key={index}>{row.join(",")}</div>
      ))}
    </details>
  );
}

export default Telemetry;

