// import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const [access, setAccess] = useState(false);
const navigate = useNavigate();

// const MedicLogin = () => {
//   return (
//     <div>MedicLogin</div>
//   )
// }


function login(userData) {
  const registeredUsers = [
    { username: "user1@example.com", password: "password1" },
    { username: "user2@example.com", password: "password2" },
    { username: "user3@example.com", password: "password3" },
  ];

  const registeredUser = registeredUsers.find(
    (user) => user.username === userData.username && user.password === userData.password
  );

  if (registeredUser) {
    setAccess(true);
    navigate("/home");
    alert("Bienvenidos a nuestra app");
  } else {
    alert("Usuario y/o contraseña incorrectos");
  }
}

function logout() {
  setAccess(false);
  navigate("/");
}

function handleFacebookLogin(response) {
  const { accessToken } = response;
  // usar accessToken para autenticar al usuario en la aplicación
  setAccess(true);
  navigate("/home");
  alert("Bienvenido a nuestra app");
}

useEffect(() => {
  // cargar la API de Facebook SDK
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: "tu_app_id_de_facebook",
      cookie: true,
      xfbml: true,
      version: "v11.0"
    });

    window.FB.AppEvents.logPageView();
  };

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, "script", "facebook-jssdk"));
}, []);

return (
  <>
    {access ? (
      <button onClick={logout}>Logout</button>
    ) : (
      <>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button onClick={() => login({ username, password })}>Login</button>
        <FacebookLogin
          appId="tu_app_id_de_facebook"
          fields="name,email,picture"
          callback={handleFacebookLogin}
        />
      </>
    )}
  </>
);


export default MedicLogin