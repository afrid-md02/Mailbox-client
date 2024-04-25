import { Card, CloseButton, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import HTMLReactParser from "html-react-parser";
import { listdataActions } from "../Store/list-data";
import classes from "./full-email.module.css";

function FullEmail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const fullEmail = useSelector((state) => state.listdata.currEmail);

  const subject = fullEmail.subject;

  const backToHomeHandler = () => {
    dispatch(listdataActions.removeCurr());
    history.replace("/home-page");
  };
  return (
    <Container className={classes.containerSpan}>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <div className={classes.closebutton}>
          <CloseButton onClick={backToHomeHandler} />
        </div>
        <div className={classes.fromToSpan}>
          <span>
            <p>from :</p>
            <p>{fullEmail.userEmial}</p>
          </span>
          <span>
            <p>To :</p>
            <p>{fullEmail.emailheWantstoSend}</p>
          </span>
        </div>
        <div className={classes.titleSpan}>
          <h2 className={classes.title}>Title:</h2>
          <h3>{fullEmail.title}</h3>
        </div>
        <div>
          <h2 className={classes.title}>Subject:</h2>
          <div className={classes.emailSubject}>{HTMLReactParser(subject)}</div>
        </div>
        <div className={classes.dateSpan}>
          <p>on :</p>
          <p>{fullEmail.date}</p>
        </div>
      </Card>
    </Container>
  );
}

export default FullEmail;

// const newEmail = {
//     userEmial: userEmail,
//     emailheWantstoSend: emailheWantstoSend,
//     title: enteredTitle,
//     subject: enteredSubject,
//     unread : true,
//     date : new Date()
//   };
