import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Sidebar = (): JSX.Element => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className={'flex-column align-items-start h-100'}
    >
      <Navbar.Brand href="#home" className="px-3">
        React-Bootstrap
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="align-items-start">
        <Nav className="flex-column">
          <NavLink to="/" className="nav-link px-3">
            Dashboard
          </NavLink>
          <NavLink to="/time-report" className="nav-link px-3">
            Report time
          </NavLink>
          <NavLink to="/logout" className="nav-link px-3">
            Logout
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
