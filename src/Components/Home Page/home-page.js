import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./Navbar in home/navbar";
import LeftSpan from "./Home body left span/home-body-left-span";
import InboxEmails from "./List of email/list-of-email";
import { listdataActions } from "../Store/list-data";
import classes from "./home-page.module.css";

function HomePage() {

  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email)


  useEffect(() => {
    console.log('inbox renders')
    fetch(`https://mail-box-client-ade18-default-rtdb.firebaseio.com/${email}/inbox.json`).then((res) => {
      if(res.ok){
        return res.json();
      }
      else{
        return res.json().then((data) => {
          throw new Error(data.message);
        })
      }
    }).then((data) =>{
            if (data === null) {
        return;
      } else {
        const inboxArray = Object.values(data);
        const Emailsid = Object.keys(data);

        for (let i = 0; i < inboxArray.length; i++) {
          dispatch(
            listdataActions.inboxAddEmail({
              mail: { ...inboxArray[i] },
              id: Emailsid[i],
            })
          );
        }
      }
    }).catch((err) =>{
      alert(err.message);
    })
  })


  return (
    <React.Fragment>
      <NavBar />
      <div className={classes.LeftSpaninhomebody}>
        <LeftSpan />
        <InboxEmails />
      </div>
    </React.Fragment>
  );
}
export default HomePage;
