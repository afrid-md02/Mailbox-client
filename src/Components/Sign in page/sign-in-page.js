import { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { Card, Form, FloatingLabel, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authActions } from "../Store/auth";
import classes from "./sign-in-page.module.css";

function SignInPage(){
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const switchAuthHandler = () =>{
    history.replace('./signup-page')
  }

  const signInSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA56mcljKgt-PKtnGJpL9a2XJ96kIcfkh4",
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
            history.replace('./home-page')
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const email = data.email.replace(/[@.]/g, "");
        const token = data.idToken;
        dispatch(authActions.login({ token: token, email: email, originalEmail : data.email }));
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('originalEmail', data.email);
        console.log(data);
      })
      .catch((error) => {
        const errMessage = error.message;
        toast.error(errMessage, {
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
  };

  const forgotPassowordHandler = (e) => {
    e.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA56mcljKgt-PKtnGJpL9a2XJ96kIcfkh4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailInputRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          toast.success("Reset link is sent to your mail!", {
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
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .catch((err) => {
        const errMessage = err.message;
        toast.error(errMessage, {
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
  };

  return (
    <div className={classes.signin}>
      <ToastContainer />
      <Card
      bg= 'dark'
        style={{
          width: "500px",
          height: "auto",
          boxShadow: "0 0 30px 5px",
        }}
      >
        <Form onSubmit={signInSubmitHandler}>
          <Form.Text
            className={classes.signinText}
            style={{ fontSize: "400%", marginTop: "7%", color:'white' }}
          >
            Sign in
          </Form.Text>
          <Form.Group className={classes.body}>
            <Form.Group className={classes.input}>
              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
              >
                <Form.Control
                  type="email"
                  placeholder="Email"
                  ref={emailInputRef}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className={classes.input}>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
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
                  width: "120px",
                }}
              >
                Log in
              </Button>
            )}
          </Form.Group>
          <Form.Group className={classes.forgotSpan}>
            <p className={classes.forgot} onClick={forgotPassowordHandler}>
              Forgot Password?
            </p>
          </Form.Group>
        </Form>
      </Card>
      <span>
        <button
          className={classes.switchAuthButton}
          onClick={switchAuthHandler}
        >
          Don't have an account? Sign up
        </button>
      </span>
    </div>
  );
}
export default SignInPage;
