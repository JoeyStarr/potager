import React from "react";
import { useAuth } from "../../hooks/useAuth";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import AdminStack from "./AdminStack";

const RootNavigation = () => {
  const { user, admin } = useAuth();

  if (user && admin) {
    return <AdminStack />;
  } else {
    return user ? <UserStack /> : <AuthStack />;
  }
};

export default RootNavigation;
