import React from "react";
import { app } from "src/base";

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => app.auth().signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
