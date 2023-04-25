import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import UserContext from "../auth/UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *Coinly
 * Routed at /
 *
 * Routes -> Homepage
 */

function Home() {
  const { currentUser } = useContext(UserContext);

  return ( 
      <div className="Homepage">
        <div className="container text-center">
          <h1 className="mb-4 font-weight-bold">Coinly</h1>
          <p className="lead">Crypto Currency Price Check</p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.firstName || currentUser.username}!
              </h2>
              : (
                  <p className="buttons">
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
        </div>
      </div>
  );
}

export default Home;
