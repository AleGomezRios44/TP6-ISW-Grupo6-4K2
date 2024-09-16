import './App.css';
import {HashRouter, Route, Routes, Navigate} from 'react-router-dom'
import Navegacion from './components/Navegacion.jsx';
import Footer from './components/Footer.jsx';
import PedidoEnvio from './components/PedidoEnvio.jsx';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navegacion/>
        <div className="divBody">
            <Routes>
              <Route path = '/pedir-envio' element = {<PedidoEnvio/>} />
              <Route path = '*' element = {<Navigate to= '/pedir-envio' replace />} />
            </Routes>
        </div>
        <Footer/>
      </HashRouter>
      
    </div>
  );
}

export default App;
