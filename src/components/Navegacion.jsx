import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
//import icono from "../images/icono.png"; importar el icono de tango app
import Dropdown from 'react-bootstrap/Dropdown';
import "../Texto.css";

function Navegacion() {
  return (
    <>
      <Navbar className="roboto-texto" variant="dark" style={{ backgroundColor: '#03045E', position: 'sticky', top: 0, zIndex: 1000 }}>
        <Container>
          <img
            src={""}
            alt=""
            style={{ marginRight: '10px', height: '50px', width: '50px', borderRadius: '10%', position: 'relative', top: '-4px' }}
          />
          <Navbar.Brand href="#home" style={{ marginBottom: -10, fontSize: '140%', fontWeight: 650 }}>
            Tango App
            <br />
            <small style={{ fontSize: '80%', position: 'relative', top: '-15px' }}>Servicios de transporte</small>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {window.innerWidth < 768 ? (
              <Dropdown>
              <Dropdown.Toggle style={{backgroundColor: '#8E8E8E'}} id="dropdown-basic">
                
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#pedir-envio" style={{ marginBottom: 0, fontSize: '115%' }}>Inicio</Dropdown.Item>
                <Dropdown.Item href="#pedir-envio" style={{ marginBottom: 0, fontSize: '115%' }}>Solicitar envío</Dropdown.Item>
                <Dropdown.Item href="#pedir-envio" style={{ marginBottom: 0, fontSize: '115%' }}>Seguir envío</Dropdown.Item>
                <Dropdown.Item href="#pedir-envio" style={{ marginBottom: 0, fontSize: '115%' }}>Cotizaciones</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
            ) : (
                <Nav className="navbar navbar-expand-lg" style={{ marginLeft: 'auto' }}>
                  <Nav.Link href="#pedir-envio" style={{ marginBottom: 0, fontSize: '115%', color: 'white' }}>Inicio</Nav.Link>
                  <Nav.Link href="#pedir-envio" style={{ marginBottom: 0, fontSize: '115%', color: 'white' }}>Solicitar envío</Nav.Link>
                  <Nav.Link href="#pedir-envio" style={{ marginBottom: 0, fontSize: '115%', color: 'white' }}>Seguir envío</Nav.Link>
                  <Nav.Link href="#pedir-envio" style={{ marginBottom: 0, fontSize: '115%', color: 'white' }}>Cotizaciones</Nav.Link>
                </Nav>
              )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navegacion;
