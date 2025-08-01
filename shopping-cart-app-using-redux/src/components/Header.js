import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";

import classes from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.isAuthenticated);
  const logoutHandler = () => {
      dispatch(authActions.logout());

  };
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
       {authenticated ? 
      <nav>
        <ul>
          <li>
            <a href="/">My Products</a>
          </li>
          <li>
            <a href="/">My Sales</a>
          </li>
          <li>
           <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
      : null}
    </header>
  );
};

export default Header;
