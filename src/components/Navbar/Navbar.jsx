import { NavLink } from "react-router-dom";

import { links } from "./navigation";
import { useAuth } from "hooks/useAuth";

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  console.log("navbar user", user);
  const { photoURL, displayName, email, role, phoneNumber } = user;

  return (
    <aside className="top">
      <div
        className="navbar navbar-dark bg-dark flex-column align-items-start "
        style={{ height: "100vh" }}
      >
        <div className="d-flex align-items-center">
          <button
            className="navbar-toggler mr-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {photoURL && (
            <img
              src={user.photoURL}
              alt={`${user?.displayName}`}
              className="user-avatar"
            />
          )}

          <div>
            <span className="ml-2 mr-2 text-light">
              {displayName || "User"}
            </span>
            {role ? (
              <small className="btn-success">{role}</small>
            ) : (
              isAdmin && <small className="btn-success">admin</small>
            )}
            {email && <p className="ml-2 mr-2 text-light">{email}</p>}
            {phoneNumber && (
              <p className="ml-2 mr-2 text-light">{phoneNumber}</p>
            )}
          </div>
        </div>

        <div className="collapse bg-dark p-4" id="navbarToggleExternalContent">
          <nav className=" d-flex flex-column">
            {links.map(({ text, to, role }) =>
              role && !isAdmin ? null : (
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
              )
            )}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
