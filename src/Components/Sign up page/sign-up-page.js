import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Form, FloatingLabel } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./sign-up-page.module.css";

function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const history = useHistory();

  const switchAuthHandler = () =>{
    history.replace('./signin-page')
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (
      !enteredEmail.includes("@", ".com") ||
      enteredPassword.length === 0 ||
      enteredConfirmPassword.length === 0
    ) {
      toast.error("Enter valid input field", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else if (enteredPassword !== enteredConfirmPassword) {
      toast.error("password does not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else {
      setLoading(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyA56mcljKgt-PKtnGJpL9a2XJ96kIcfkh4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setLoading(false);
          if (response.ok) {
            toast.success("Your new account is created Successfully!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              pauseOnFocusLoss: false,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setTimeout(() => {
              history.replace("/signin-page");
            }, 3000);
            return response.json();
          } else {
            return response.json().then((data) => {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err.message);
          const errorMessage = err.message;
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    }
    emailInputRef.current.value = null;
    passwordInputRef.current.value = null;
    confirmPasswordInputRef.current.value = null;
  };
  return (
    <div className={classes.signin}>
      <ToastContainer />
      <Card
        bg="dark"
        style={{
          width: "500px",
          height: "auto",
          boxShadow: "0 0 30px 5px",
        }}
      >
        <Form onSubmit={submitHandler}>
          <Form.Text
            className={classes.signinText}
            style={{ fontSize: "400%", marginTop: "7%", color: "white" }}
          >
            Sign up
          </Form.Text>

          <Form.Group className={classes.body}>
            <Form.Group className={classes.input}>
              <FloatingLabel controlId="floatingEmail" label="Email">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  ref={emailInputRef}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className={classes.input}>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordInputRef}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className={classes.input}>
              <FloatingLabel
                controlId="ConfirmfloatingPassword"
                label="Confirm password"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  ref={confirmPasswordInputRef}
                />
              </FloatingLabel>
            </Form.Group>
          </Form.Group>

          <Form.Group className={classes.buttonspan}>
            {loading ? (
              <p className={classes.validate}>validating your details...</p>
            ) : (
              <Button
                variant="outline-warning"
                type="submit"
                style={{
                  fontSize: "20px",
                  fontFamily: "cursive",
                  width: "220px",
                }}
              >
                Create new account
              </Button>
            )}
          </Form.Group>
        </Form>
      </Card>
      <span>
        <button className={classes.switchAuthButton} onClick={switchAuthHandler}>
          Already have an account? Sign in
        </button>
      </span>
    </div>
  );
}
export default SignUpPage;
