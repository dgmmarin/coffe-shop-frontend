import { useEffect } from "react";
import { useUser, User } from "./use-user";
import { useLocalStorage } from "./local-storage";

export const useAuth = () => {
  const { user, addUser, removeUser, setUser,  } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const user = getItem("user");
    console.log("localStorage.getItem(user)")
    console.log(user)
    console.log(localStorage.getItem("user"))
    console.log("localStorage.getItem(user)")
    if (user) {
      addUser(JSON.parse(user));
    }
  }, []);

  const login = (user: User) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  const getUser = () => {
    const user = getItem("user");
    if (user) {
      addUser(JSON.parse(user));
    }
    return user
  }

  return { user, login, logout, setUser, getUser };
};