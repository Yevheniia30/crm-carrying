import { NavLink } from "react-router-dom";

import { links } from "./navigation";
import { useAuth } from "hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  console.log("navbar user", user);

  return (
    <aside className="top">
      <div
        className="navbar navbar-dark bg-dark flex-column align-items-start "
        style={{ height: "100vh" }}
      >
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <img src={user.photoURL} alt={`${user?.displayName}`} /> */}
          <div>
            <span className="ml-2 mr-2 text-light">{user.displayName}</span>
            <small className="btn-success">admin</small>
            <p className="ml-2 mr-2 text-light">{user.email}</p>
          </div>
          {/* <p className="text-light">user role</p> */}
        </div>

        <div className="collapse bg-dark p-4" id="navbarToggleExternalContent">
          <nav className=" d-flex flex-column">
            {links.map(({ text, to }) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-warning h5 text-decoration-none"
                    : "text-white h5 text-decoration-none"
                }
                to={to}
                key={to}
              >
                {text}
              </NavLink>
            ))}
          </nav>
          {/* <div className="bg-dark p-4">
            <h5 className="text-white h4">Collapsed content</h5>
            <span className="text-muted">Toggleable via the navbar brand.</span>
          </div> */}
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
