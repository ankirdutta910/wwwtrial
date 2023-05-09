import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { Form } from "react-bootstrap";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
function FPassword() {
  const { sendEmail } = useUserAuth();
  const navigate = useNavigate();

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    try {
      await sendEmail(email);
      console.log("Password reset email sent successfully!");
      alert("Password reset email sent successfully!");
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <div className="container my-4">
        <form onSubmit={handlePasswordReset}>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <button type="submit">Reset Password</button>
        </form>
      </div> */}

      <div className="container" id="loginbox">
        <div class="account-page">
          <div class="account-center">
            <div class="account-box">
              <div class="account-logo">
                <h4 style={{ fontWeight: "bold" }}>Reset Password</h4>
                <hr></hr>
              </div>

              <Form onSubmit={handlePasswordReset} class="form-signin">
                <div class="form-group">
                  <label>Registered Email</label>
                  <Form.Group className="mb-4" controlId="formBasicEmail">
                    <Form.Control
                      class="form-control"
                      type="email"
                      name="email"
                      placeholder="Email address"
                    />
                  </Form.Group>
                </div>

                <div class="form-group text-center">
                  <Button
                    type="Submit"
                    icon
                    color="red"
                    labelPosition="left"
                    size="small"
                    style={{ color: "white" }}
                  >
                    <Icon name="check" />
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FPassword;
