import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <div className="nav-menu">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/library">all videos</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;