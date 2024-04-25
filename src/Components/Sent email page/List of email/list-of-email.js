import { useSelector, useDispatch } from "react-redux";
import { BiRefresh } from "react-icons/bi";
import { FcEmptyTrash } from "react-icons/fc";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import { listdataActions } from "../../Store/list-data";
import classes from "./list-of-email.module.css";

function SentEmails() {

  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const sentEmails = useSelector((state) => state.listdata.sentEmails);
  const history = useHistory();

  useEffect(() => {
    if (sentEmails.length === 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [sentEmails.length]);


  const refreshPageHandler = () => {
    window.location.reload();
  };

  const deleteHandler = (mail) => {
    const id = mail.id;
    fetch(
      `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/sent/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success("Email deleted successfully!", {
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
          dispatch(listdataActions.removeSentEmail({ id: id }));
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
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
  };

  const openFullEmailHandler = (mail) => {
    const replaceEmail = {
      id: mail.id,
      userEmial: mail.userEmial,
      emailheWantstoSend: mail.emailheWantstoSend,
      title: mail.title,
      subject: mail.subject,
      unread: false,
      date: mail.date,
    };

    dispatch(listdataActions.addCurrEmail({ email: replaceEmail }));
    history.replace("/fullemail-page");
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div className={classes.emailsSpan}>
        <span className={classes.refreshbuttonspan}>
          <Button
            variant="warning"
            onClick={refreshPageHandler}
            style={{ marginRight: "10px" }}
          >
            <BiRefresh style={{ fontSize: "40px" }} />
          </Button>
        </span>
        {show ? (
          <p className={classes.empty}>You sent nothing!</p>
        ) : (
          <ul className={classes.inboxList}>
            {sentEmails.map((mail) => (
              <li key={mail.id} className={classes.readEmail}>
                <span className={classes.readEmailFromText}>
                  <p>{mail.emailheWantstoSend}</p>
                </span>
                <span className={classes.readEmailTitle}>
                  <p
                    className={classes.textTitle}
                    onClick={() => openFullEmailHandler(mail)}
                  >
                    {mail.title}
                  </p>
                </span>
                <Button
                  variant="outline-danger"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                  }}
                  onClick={() => deleteHandler(mail)}
                >
                  <FcEmptyTrash />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
}
export default SentEmails;
