import './AgroioNavbar.css';
import React from 'react';
import logo from "../../logo.png";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import { logout } from "../../store/actions";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
const AgroioNavbar = () => {
  const location = useLocation();
  // TODO: Improve to have a loop with links
  // const navLinks = [{
  //   url: "/dashboard",
  //   name: "Dashboard"
  // }, {
  //   url: "/devices",
  //   name: "Devices"
  // }];
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="container-fluid" activeKey={location.pathname}>
        <Navbar.Brand>
          <img src={logo} className="app-logo" alt="logo" />
        </Navbar.Brand>
        {/*TODO: Improve to have a loop with links*/}
        <Nav.Link as={Link} to="/dashboard" eventKey="/dashboard">
          Dashboard
        </Nav.Link>
        <Nav.Link as={Link} to="/devices" eventKey="/devices">
          Devices
        </Nav.Link>
        <Nav.Link className="ml-auto">
          <BoxArrowRight size={22} onClick={logout}/>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default AgroioNavbar;
