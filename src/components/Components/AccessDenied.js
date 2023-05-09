import React from "react";
import { useUserAuth } from "../Admin/context/UserAuthContext";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router";
function AccessDenied() {
  function refreshPage() {
    window.location.reload(false);
  }

  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/signin");
      refreshPage();
      return false;
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div class="container text-center my-5">
        <h1>
          <code style={{ color: "red" }}>Access Denied</code>
        </h1>
        <hr
          class="w3-border-white w3-animate-left"
          style={{ margin: "auto", width: "50%" }}
        />
        <h3 class="w3-center w3-animate-right">
          You dont have permission to view this site.
        </h3>
        <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
        <h6 style={{ color: "red" }}>error code:403 forbidden</h6>
        <br></br>
        <br></br>
        <Button
          icon
          labelPosition="left"
          size="small"
          color="grey"
          style={{ marginTop: "9px" }}
          onClick={handleLogout}
        >
          {" "}
          <Icon name="home" /> Home
        </Button>
      </div>
    </>
  );
}

export default AccessDenied;
