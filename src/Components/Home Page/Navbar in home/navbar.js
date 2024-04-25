import { Button, Container, Navbar, Form} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from './navbar.module.css';
import {authActions} from '../../Store/auth';
import { listdataActions } from "../../Store/list-data";

function NavBar() {
  const email = useSelector((state) => state.auth.originalEmail);
  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler=()=>{
    dispatch(authActions.logout());
    dispatch(listdataActions.logoutHandler());
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('originalEmail');
    history.replace('/signin-page');
  }

  return (
    <Navbar className="bg-primary size-lg" variant="dark">
      <Container style={{ width: '60%'}}>
        <Navbar.Text className={classes.heading}>Mail box client</Navbar.Text>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="warning">Search</Button>
          </Form>
      </Container>
      <div className={classes.rightdivinNavbar}>
      <Navbar.Text>Signed in as : {email}</Navbar.Text>
      <Button variant="danger" className={classes.logoutButton} onClick={logoutHandler}>Log out</Button>
      </div>
    </Navbar>
  );
}
export default NavBar;
