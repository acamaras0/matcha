import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, setUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const addUser = (user) => {
    setUser([...user]);
  };
  const addSelectedUser = (user) => {
    setSelectedUser([...user]);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        addUser,
        selectedUser,
        setSelectedUser,
        addSelectedUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
