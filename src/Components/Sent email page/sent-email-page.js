import React, { useEffect } from "react";
import NavBar from "../Home Page/Navbar in home/navbar";
import LeftSpan from "./Left span in sent page/left-span-in-sent-page";
import classes from "./sent-email-page.module.css";
import SentEmails from "./List of email/list-of-email";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { listdataActions } from "../Store/list-data";

function SentEmailPage() {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('sent renders')
    fetch(
      `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/sent.json`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        if (data === null) {
          return;
        } else {
          const sentArray = Object.values(data);
          const Emailsid = Object.keys(data);

          console.log(sentArray);

          for (let i = 0; i < sentArray.length; i++) {
            dispatch(
              listdataActions.sentEmail({
                mail: { ...sentArray[i] },
                id: Emailsid[i],
              })
            );
          }
        }
      })
      .catch((error) => {
        toast.error(error.message, {
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
  });

  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar />
      <div className={classes.LeftSpaninhomebody}>
        <LeftSpan />
        <SentEmails />
      </div>
    </React.Fragment>
  );
}
export default SentEmailPage;
