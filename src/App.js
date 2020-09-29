import React from "react";
import TwitterLogin from "";
import io from "socket.io-client";
import "./App.css";

const socket = io(`${process.env.API_URL}`);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TwitterLogin socket={socket} />
      </header>
    </div>
  );
}

export default App;
