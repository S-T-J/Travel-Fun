import { Link, Route, Switch } from "react-router-dom";
import { useContext } from "react";
import TheContext from "../TheContext";
import Auth from "./Auth";

function Header(props) {
  const logOut = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  let { user, setUser, getUser } = useContext(TheContext);

  return (
    <header className="homepage-header">
      <div className="homepage-title">
        <h1>
          TravelBug
          <img src="https://img.icons8.com/ios-filled/30/000000/airplane-mode-on.png" />
        </h1>
      </div>
      <div className="navbar">
        <nav className="nav-div">
          <Link to="/">Home</Link>
          {/* <Link to="/all-posts">Tips & Tricks</Link>
                {user?.name ? */}
          <>
            {/* <Link to="/new-post">Attractions</Link>
                        <Link to="/deals">Deals</Link> */}
            <Link to="/new-thread">New Thread</Link>
            <Link to="/all-threads">All Threads</Link>
            <Link to="/profile">Profile</Link>
          </>{" "}
        </nav>
        <div id="auth">
          {user?.name ? (
            <div>
              <h4>{user?.name}</h4>
              <button onClick={logOut}>Log Out</button>
            </div>
          ) : (
            <Auth getUser={getUser} />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
