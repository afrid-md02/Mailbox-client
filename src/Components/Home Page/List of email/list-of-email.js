import { useSelector, useDispatch } from "react-redux";
import { BiRefresh } from "react-icons/bi";
import { FcEmptyTrash } from "react-icons/fc";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./list-of-email.module.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listdataActions } from "../../Store/list-data";

function InboxEmails() {
  const history = useHistory();
  const [show, setShow] = useState(true);
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const inboxEmails = useSelector((state) => state.listdata.inbox);

  useEffect(() => {
    if (inboxEmails.length === 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [inboxEmails.length]);


  const refreshPageHandler = () => {
    window.location.reload();
  };

  const deleteHandler = (mail) => {
    const id = mail.id;
    fetch(
      `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success("Email removed successfully!", {
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
          dispatch(listdataActions.inboxRemoveEmail({ id: id }));
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
      })
      .then(
        fetch(
          `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/deletedEmails.json`,
          {
            method: "POST",
            body: JSON.stringify({
              userEmial: mail.userEmial,
              emailheWantstoSend: mail.emailheWantstoSend,
              title: mail.title,
              subject: mail.subject,
              unread: mail.unread,
              date: mail.date,
            }),
          }
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
            dispatch(
              listdataActions.deletedEmail({
                mail: { ...mail, date: JSON.stringify(mail.date) },
                id: data.name,
              })
            );
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
          })
      );
  };



  const openFullEmailHandler = (mail) => {
    const replaceEmail = {
      userEmial: mail.userEmial,
      emailheWantstoSend: mail.emailheWantstoSend,
      title: mail.title,
      subject: mail.subject,
      unread: false,
      date: mail.date,
    };

    if (mail.unread === true) {
      fetch(
        `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox/${mail.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(replaceEmail),
        }
      )
        .then((response) => {
          if (response.ok) {
            dispatch(
              listdataActions.inboxUpdateEmail({
                mail: { ...mail, unread: false },
                id: mail.id,
              })
            );
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
    }
    dispatch(listdataActions.addCurrEmail({ email: mail }));
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
          <p className={classes.empty}>your inbox is empty !</p>
        ) : (
          <ul className={classes.inboxList}>
            {inboxEmails.map((mail) => {
              if (mail.unread === true) {
                return (
                  <li key={mail.id} className={classes.unreadLi}>
                    <span className={classes.fromEmailText}>
                      <p>{mail.userEmial}</p>
                    </span>
                    <span className={classes.aboutEmailText}>
                      <p
                        onClick={() => openFullEmailHandler(mail)}
                        className={classes.textTitle}
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
                );
              } else {
                return (
                  <li key={mail.id} className={classes.readEmail}>
                    <span className={classes.readEmailFromText}>
                      <p>{mail.userEmial}</p>
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
                );
              }
            })}
          </ul>
        )}
      </div>
    </React.Fragment>
  );
}

export default InboxEmails;
