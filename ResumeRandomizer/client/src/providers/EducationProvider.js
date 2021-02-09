import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import "firebase/auth";

export const EducationContext = React.createContext();

export const EducationProvider = (props) => {
  const [education, setEducation] = useState([]);

  const apiUrl = "/api/education";
  const { getToken } = useContext(UserProfileContext);

  const getEducation = (id) => {
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

  const getUserEducation = (id) => {
    getToken().then((token) =>
      fetch(apiUrl + `/getbyuser/${id}`, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if (resp.ok) {
          return resp.json().then(setEducation);
        }
        throw new Error("Unauthorized");
      })
    );
  };

  const addEducation = (education) =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(education),
      }).then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    );

  const deleteEducation = (id) => {
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

  const editEducation = (id, education) => {
    return getToken().then((token) =>
      fetch(apiUrl + `/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(education),
      }).then((resp) => {
        if (resp.ok) {
          return;
        }
        throw new Error("Unauthorized");
      })
    );
  };

  return (
    <EducationContext.Provider
      value={{
        education,
        getEducation,
        getUserEducation,
        addEducation,
        deleteEducation,
        editEducation,
      }}
    >
      {props.children}
    </EducationContext.Provider>
  );
};
