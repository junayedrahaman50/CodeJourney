import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import "./styles.css";
import Notes from "./Notes";
// import WaitList from "./WaitList";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "4rem",
};

const textCenter = {
  textAlign: "center",
};

// const customStyles = {};

export default function App() {
  // Get initial values from localStorage
  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("userProfile")) || null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  useEffect(() => {
    // Update localStorage when userProfile or isLoggedIn changes
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [userProfile, isLoggedIn]);

  const handleLoginResponse = (response) => {
    if (response.error) {
      console.log(response.error);
    } else {
      const credential = response.credential;
      const decodedCredential = jwtDecode(credential);
      console.log(decodedCredential);
      const userInfo = {
        email: decodedCredential.email,
        name: decodedCredential.name,
        firstName: decodedCredential.given_name,
        picture: decodedCredential.picture,
        userName: getUsername(decodedCredential.email),
        userId: decodedCredential.sub,
        token: credential, // Store the token
      };
      setUserProfile(userInfo);
      console.log(userInfo);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    googleLogout();
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  const getUsername = (email) => {
    const userName = email.replace("@gmail.com", "");
    // if (userName.length > 10) {
    //   return userName.slice(0, 10) + "..";
    // }
    return userName;
  };

  return (
    <>
      {isLoggedIn && userProfile ? (
        <div className="App">
          <BrowserRouter>
            <Navbar userProfile={userProfile} handleLogout={handleLogout} />
            <main className="main">
              <Routes>
                {/* <Route path="*" element={<WaitList />}></Route> */}
                <Route
                  path="/"
                  element={<Home userProfile={userProfile} />}
                ></Route>
                <Route path="/notes/:id" element={<Notes />}></Route>
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      ) : (
        <>
          <div className="modal animate__animated animate__fadeIn">
            <h2 style={textCenter} className="title">
              Track your coding adventure with CodeJourney!
            </h2>
            <p
              style={{ textAlign: "center", marginBottom: 0 }}
              className="description"
            >
              Sign in and get started 🔥
            </p>
            <div style={containerStyle}>
              <GoogleLogin
                onSuccess={handleLoginResponse}
                onError={handleLoginResponse}
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              />
            </div>
          </div>
          <div className="overlay animate__animated animate__fadeIn"></div>
        </>
      )}
    </>
  );
}
