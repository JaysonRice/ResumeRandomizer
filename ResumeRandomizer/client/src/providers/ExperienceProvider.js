import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const ExperienceContext = React.createContext();

export const ExperienceProvider = (props) => {
  const [experience, setExperience] = useState([]);

  const apiUrl = "/api/experience";
  const { getToken } = useContext(UserProfileContext);

  const getExperience = (id) => {
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

  const getUserExperience = (id) => {
    getToken().then((token) =>
      fetch(apiUrl + `/getbyuser/${id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json().then(setExperience);
        }
        throw new Error("Unauthorized");
      })
    );
  };

  const addExperience = (experience) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experience),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const deleteExperience = (id) => {
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
        throw new Error("Failed to delete post.");
      })
    );
  };

  const editExperience = (id, experience) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(experience),
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        throw new Error("Unauthorized");
      })
    );
  };

  return (
    <ExperienceContext.Provider
      value={{
        experience,
        getExperience,
        getUserExperience,
        addExperience,
        deleteExperience,
        editExperience,
      }}
    >
      {props.children}
    </ExperienceContext.Provider>
  );
};
