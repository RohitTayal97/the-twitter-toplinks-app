import React, { useState, useEffect } from "react";

const TwitterLogin = ({ socket }) => {
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(false);
  var popup = null;

  useEffect(() => {
    socket.on("authdone", (user) => {
      popup.close();
      setUser(user);
    });
  }, []);

  const checkPopup = () => {
    const check = setInterval(() => {
      if (popup.closed) {
        clearInterval(check);
        setDisabled(false);
      }
    }, 1000);
  };

  const openPopup = () => {
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${process.env.API_URL}/auth?socketId=${socket.id}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };

  const startAuth = (e) => {
    if (disabled) {
      e.preventDefault();
      popup = openPopup();
      checkPopup();
      setDisabled(true);
    }
  };

  return (
    <h4>
      {user.name ? (
        <p>signed in as user.name</p>
      ) : (
        <button onClick={() => startAuth}>
          <img src="../signInButton.png" alt="Sign In"></img>
        </button>
      )}
    </h4>
  );
};

export default TwitterLogin;
