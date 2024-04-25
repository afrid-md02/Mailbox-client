import React, { useEffect } from "react";
import NavBar from "../Home Page/Navbar in home/navbar";
import LeftSpan from "./Left span in delete page/left-span-in-deletePage";
import DeletedEmails from "./List of email/list-of-email";
import classes from "./delete-page.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { listdataActions } from "../Store/list-data";

function DeletePage() {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('delete renders')
    fetch(
      `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/deletedEmails.json`
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
          const inboxArray = Object.values(data);
          const Emailsid = Object.keys(data);

          for (let i = 0; i < inboxArray.length; i++) {
            dispatch(
              listdataActions.deletedEmail({
                mail: { ...inboxArray[i] },
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
        <DeletedEmails />
      </div>
    </React.Fragment>
  );
}
export default DeletePage;
