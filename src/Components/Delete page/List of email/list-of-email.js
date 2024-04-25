import { useSelector, useDispatch } from "react-redux";
import { BiRefresh } from "react-icons/bi";
import { FcEmptyTrash } from "react-icons/fc";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "./list-of-email.module.css";
import React, { useEffect, useState } from "react";
import { listdataActions } from "../../Store/list-data";

function DeletedEmails() {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const deletedEmails = useSelector((state) => state.listdata.deletedEmails);

  useEffect(() => {
    if (deletedEmails.length === 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [deletedEmails.length]);

  

  const refreshPageHandler = () => {
    window.location.reload();
  };

  const deleteHandler = (mail) =>{
    const id = mail.id;
    fetch(
      `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/deletedEmails/${id}.json`,
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
          dispatch(listdataActions.removeDeletedEmail({ id: id }));
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
  }
 

  const recoverHandler =(mail) =>{
    const id = mail.id;
    fetch(
      `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/deletedEmails/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          dispatch(listdataActions.removeDeletedEmail({ id: id }));
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
       }).then(
        fetch(
        `https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox.json`,
        {
          method: "POST",
          body : JSON.stringify({
            userEmial: mail.userEmial,
            emailheWantstoSend: mail.emailheWantstoSend,
            title: mail.title,
            subject: mail.subject,
            unread : mail.unread,
            date : mail.date
          })
        }
      )
        .then((response) => {
          if (response.ok) {
            toast.success("Email recovered successfully!", {
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
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          console.log(data.name);
        }).catch((error) => {
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
    )
  }

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
          <p className={classes.empty}>No deleted emails!</p>
        ) : (
          <ul className={classes.inboxList}>
            {deletedEmails.map((mail) => (
              <li key={mail.id} className={classes.readEmail}>
                <span className={classes.readEmailFromText}>
                  <p>{mail.userEmial}</p>
                </span>
                <span className={classes.readEmailTitle}>
                  <p className={classes.textTitle}>{mail.title}</p>
                </span>

                <Button
                  variant="outline-warning"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                    marginRight :'10px'
                  }}
                  onClick={() => recoverHandler(mail)}
                >
                  <RiDeviceRecoverLine />
                </Button>

                <Button
                  variant="outline-danger"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                  }}
                  onClick={()=>deleteHandler(mail)}
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

export default DeletedEmails;
