import React, { useState, useRef } from "react";
import { Card, Button, CloseButton} from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from "./send-email-page.module.css";
import JoditEditor from "jodit-react";
import {  useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listdataActions } from "../Store/list-data";



function SendMail() {
  const email = useSelector((state) => state.auth.originalEmail);
  const editor = useRef(null);
  const [content, setContent] = useState(null);
  const emailInputRef = useRef();
  const titleInputRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();


  const closeSendHandler = () => {
    // history.push('/home-page');
    history.goBack();
  };

  const sendEmailHandler = async(e) => {
    e.preventDefault();

    const userEmail = email;
    const emailheWantstoSend = emailInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredSubject = content;

    if(emailheWantstoSend === null || !emailheWantstoSend.includes('@','.com')){
      toast.error('Enter valid email!', {
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
    }
    else{

      try{
        const newEmail = {
          userEmial: userEmail,
          emailheWantstoSend: emailheWantstoSend,
          title: enteredTitle,
          subject: enteredSubject,
          unread : true,
          date : new Date()
        };

        const mail = emailheWantstoSend.replace(/[@.]/g,'');
        const email = userEmail.replace(/[@.]/g,'');

        let response1 = await fetch(`https://mail-box-client-ade18-default-rtdb.firebaseio.com/${mail}/inbox.json`,{
          method: 'POST',
          body : JSON.stringify(newEmail),
        })

        let response2 = await fetch(`https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/sent.json`,{
          method: 'POST',
          body : JSON.stringify(newEmail),
        })


        let data1 = await response1.json();
        let data2 = await response2.json();

        if(response1.ok && response2.ok){
          toast.success('Email sent successfully!', {
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
          dispatch(listdataActions.sentEmail({mail : {...newEmail, date : JSON.stringify(newEmail.date)}, id : data2.name}))
          emailInputRef.current.value=null;
          titleInputRef.current.value = null;
          setContent(null);
          editor.current.value = null;
        }
        else{
          throw new Error(data1.error.message, data2.error.message)
        }
      }catch(error){
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
      }

    }
  };

  return (
    <React.Fragment>
    <ToastContainer/>
    <Card
      className="shadow-lg p-3 mb-5 bg-white rounded"
      style={{ marginTop: "2%", marginLeft: "2%", marginRight: "2%" }}
    >
      <div className={classes.closebutton}>
        <CloseButton onClick={closeSendHandler} />
      </div>
      <div className={classes.maindivinsend}>
        <form className={classes.form} onSubmit={sendEmailHandler}>
          <div className={classes.tospan}>
            <label className={classes.to}>To : </label>
            <input
              type="email"
              className={classes.toinputtag}
              ref={emailInputRef}
            ></input>
          </div>
          <div className={classes.titleSpan}>
            <input
              className={classes.title}
              placeholder="Enter title"
              ref={titleInputRef}
            />
          </div>
          <div className={classes.content}>
            <div className={classes.subject}>Content : </div>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <div className={classes.buttonsdiv}>
            <Button style={{ marginLeft: "10px" }} type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </Card>
    </React.Fragment>
  );
}
export default SendMail;
