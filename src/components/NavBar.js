import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function ColorSchemesExample() {
  const [login, setLogin] = useState(false);

  const logout = () => {
    window.localStorage.removeItem("username");
    setLogin(false);
  }


  useEffect(() => {
    setLogin(localStorage.getItem("username") !== null);
  }, [])

  return (
    <div className="navcontainer">
      <nav className="navbar navbar-expand-sm">
        <div className="container">
          {/* Add a class to the a element that wraps the img element */}
          <a href="/" className="logo-link">
            <img src="/watchtoday_logo.PNG" alt="WatchToday Logo" height="30" />
          </a>
          <div className="nav-item nav-watch" id="watchListNavGroup">
            <a className="nav-link tabOption" href="/search">
              Search
            </a>
            <a className="nav-link tabOption" href="/watchlist">
              Watchlist
            </a>
          </div>
          <ul className="navbar-nav">
            {login ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/pwd" id="changePwdLink">
                    Change Password
                  </a>
                </li>
  
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/login"
                    id="logOutLink"
                    onClick={logout}
                  >
                    Log Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register" id="loginLink">
                    Create an account
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login" id="loginLink">
                    Log In
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

// Link for login page

export default ColorSchemesExample;