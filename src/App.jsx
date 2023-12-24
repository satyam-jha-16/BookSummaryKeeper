import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./features/authSlice";
import { Footer, Header } from "./components/index";
import { TailSpin } from "react-loader-spinner";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  //checking if the user is logged in or not
  useEffect(() => {
    //auth service will getCurrentUser from auth.js
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData })); //dispatch will update the state to send login info
        } else {
          dispatch(logout()); // if user not logged in then a logout is called
        }
      })
      .finally(() => {
        setLoading(false); // to set that screen is not loading anything
      });
  }, []);

  return !loading ? (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <Header />
      </div>

      {/* Centered TODO section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-4">
        <Footer />
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen bg-white">
      <Header />
      <TailSpin
        height="80"
        width="80"
        color="#1AA7EC"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      <Footer />
    </div>
  );
}

export default App;
