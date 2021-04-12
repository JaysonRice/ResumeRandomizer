import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const ProjectContext = React.createContext();

export const ProjectProvider = (props) => {
  const [projects, setProjects] = useState([]);

  const apiUrl = "/api/project";
  const { getToken } = useContext(UserProfileContext);

  const getProjects = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Unauthorized");
        }
      })
    );
  };

  const getUserProjects = (id) => {
    getToken().then((token) =>
      fetch(apiUrl + `/getbyuser/${id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json().then(setProjects);
        }
        throw new Error("Unauthorized");
      })
    );
  };

  const addProject = (project) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const deleteProject = (id) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        throw new Error("Failed to delete project.");
      })
    );
  };

  const editProject = (id, project) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        throw new Error("Unauthorized");
      })
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        getProjects,
        getUserProjects,
        addProject,
        deleteProject,
        editProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};