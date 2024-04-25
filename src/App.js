import { lazy, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import "./App.css";

const SignUpPage = lazy(() => import("./Components/Sign up page/sign-up-page"));
const SignInPage = lazy(() => import("./Components/Sign in page/sign-in-page"));
const HomePage = lazy(() => import("./Components/Home Page/home-page"));
const SendMail = lazy(() =>
  import("./Components/Send email page/send-email-page")
);
const FullEmail = lazy(() => import("./Components/Email page/full-email"));
const DeletePage = lazy(() => import("./Components/Delete page/delete-page"));
const SentEmailPage = lazy(() =>
  import("./Components/Sent email page/sent-email-page")
);


function App() {
  const userIsLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signin-page" />
        </Route>

        {!userIsLoggedIn && (
          <Route path="/signin-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <SignInPage />
            </Suspense>
          </Route>
        )}

        {!userIsLoggedIn && (
          <Route path="/signup-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <SignUpPage />
            </Suspense>
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="/home-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <HomePage />
            </Suspense>
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="/send-email-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <SendMail />
            </Suspense>
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="/fullemail-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <FullEmail />
            </Suspense>
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="/delete-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <DeletePage />
            </Suspense>
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="/sent-page" exact>
            <Suspense fallback={<h1 className="loadingPhase">Loading...</h1>}>
              <SentEmailPage />
            </Suspense>
          </Route>
        )}

        {!userIsLoggedIn && (
          <Route path="*">
            <Redirect to="/" exact />
          </Route>
        )}

        {userIsLoggedIn && (
          <Route path="*">
            <Redirect to="/home-page" exact />
          </Route>
        )}
      </Switch>
    </div>
  );
}

export default App;
