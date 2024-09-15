import { Navbar, Container, Nav } from 'react-bootstrap';
import "../Texto.css";

function Footer() {
  return (
    <>
      {/* Contenido del cuerpo de la página */}
      
      {/* Pie de página */}
      <Navbar className="roboto-texto" variant="dark" style={{ backgroundColor: '#03045E', marginTop: 'auto', paddingTop: '10px' }}>
        <Container>
          <Nav className="mx-auto" style={{color: 'white'}}>
            <div style={{ marginTop: '10px' }}>
              <h5 style={{color: 'white'}}/>
              CONTACTO
              <h5/>
            </div>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
