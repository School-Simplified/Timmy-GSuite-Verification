import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import AWS from "aws-sdk";

import { sendSQS } from "./AwsController";

const App = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const disc = queryParams.get("disc");

  const responseGoogle = (response) => {
    sendSQS(
      disc,
      response.profileObj.givenName,
      response.profileObj.familyName,
      response.profileObj.email
    );
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          borderStyle: "groove",
          width: "20rem",
          height: "7rem",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>Login with a School Simplified Email</p>
        <GoogleLogin
          clientId="507298894886-7j33c3qb3bp67ca3hui7o55umn1rivl1.apps.googleusercontent.com"
          cookiePolicy={"single_host_origin"}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={() => {}}
          redirectUri="http://localhost:3000/"
        />
      </div>
    </div>
  );
};

export default App;
