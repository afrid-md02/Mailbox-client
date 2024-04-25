import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./home-body-left-span.css";

function LeftSpan() {
  const totalEmails = useSelector(
    (state) => state.listdata.inbox
  );

  const unreadEmails = totalEmails.filter((mail) => mail.unread === true);


  const history = useHistory();
  const newEmailHandler = () => {
    history.push("/send-email-page");
  };
  return (
    <div className="left">
      <div className="compose">
        <Button
          style={{ fontFamily: "cursive", fontSize: "20px", width: "150px" }}
          onClick={newEmailHandler}
        >
          Compose
        </Button>
      </div>
      <div className="items">
        <span className="inboxSpan">
          <Link className="inboxText" to='/home-page'>inbox</Link>
          <span className="unreadText">
            <p>unread({unreadEmails.length})</p>
          </span>
        </span>
        <Link className="sentText" to='/sent-page'>sent</Link>
        <Link className="deleteText" to='/delete-page'>deleted</Link>
      </div>
    </div>
  );
}
export default LeftSpan;
