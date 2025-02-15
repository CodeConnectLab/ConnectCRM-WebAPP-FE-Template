import React, { useEffect } from "react";
import { handleLogout } from "../utils/handleLogOut";

export default function Logout() {
  useEffect(() => {
    handleLogout();
  }, []);
  return <div></div>;
}
