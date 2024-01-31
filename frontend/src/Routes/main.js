import React from "react";
import ProtectedRoute from "./protectedRoutes";

const Main = () => {
  return (
    <main>
      <div>
        <ProtectedRoute />
      </div>
    </main>
  );
};

export default Main;
