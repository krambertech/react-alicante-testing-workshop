import { NavLink } from "react-router-dom";
import examples from "../examples";

import "./Navigation.css";

export default function Navigation() {
  return (
    <nav className="Navigation">
      <ul>
        {examples.map(({ name, route }) => (
          <li key={route}>
            <NavLink
              to={route}
              className={({ isActive }) =>
                "Navigation-item" + (isActive ? " active" : "")
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
