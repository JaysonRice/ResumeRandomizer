import React, { useState, useContext } from "react";
import { Link, NavLink as RRNavLink } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);

  const [activeItem, setActiveItem] = useState("resumes");

  let userProfileId = 0;
  let userTypeId = 0;

  if (isLoggedIn === true) {
    userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    userTypeId = JSON.parse(sessionStorage.getItem("userProfile")).userTypeId;
  }

  return (
    <div>
      {isLoggedIn && (
        <Segment>
          <Menu secondary>
            <>
              <Menu.Item
                name="resumes"
                active={activeItem === "resumes"}
                onClick={() => setActiveItem("resumes")}
                as={Link}
                tag={RRNavLink}
                to="/"
              >
                Resumes
              </Menu.Item>

              <Menu.Item
                name="education"
                active={activeItem === "education"}
                onClick={() => setActiveItem("education")}
                as={Link}
                tag={RRNavLink}
                to={`/education`}
              >
                Education
              </Menu.Item>

              <Menu.Item
                name="experience"
                active={activeItem === "experience"}
                onClick={() => setActiveItem("experience")}
                as={Link}
                tag={RRNavLink}
                to={`/experience`}
              >
                Experience
              </Menu.Item>

              <Menu.Item
                name="projects"
                active={activeItem === "projects"}
                onClick={() => setActiveItem("projects")}
                as={Link}
                tag={RRNavLink}
                to={`/projects`}
              >
                Projects
              </Menu.Item>

              <Menu.Item position="right" onClick={logout}>
                Logout
              </Menu.Item>
            </>
          </Menu>
        </Segment>
      )}

      {!isLoggedIn && (
        <Menu>
          <>
            <Menu.Item>
              <Menu.Item as={Link} tag={RRNavLink} to="/login">
                Login
              </Menu.Item>
            </Menu.Item>
            <Menu.Item>
              <Menu.Item as={Link} tag={RRNavLink} to="/register">
                Register
              </Menu.Item>
            </Menu.Item>
          </>
        </Menu>
      )}
    </div>
  );
}
