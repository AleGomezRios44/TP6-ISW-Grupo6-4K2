const express = require('express')
const { DropdownDivider } = require('react-bootstrap')
const app = express()


const transportistas = [
    {
        nombre: 'Juan Pérez',
        localidad: 'Córdoba',
        provincia: 'Córdoba'
    },
    {
        nombre: 'María García',
        localidad: 'Rosario',
        provincia: 'Santa Fe'
    },
    {
        nombre: 'Carlos López',
        localidad: 'Mendoza',
        provincia: 'Mendoza'
    },
    {
        nombre: 'Ana Fernández',
        localidad: 'Salta',
        provincia: 'Salta'
    }
];

console.log(transportistas);

//Preguntar de donde puedo sacar una lista de provincias
app.post('/guardar-datos', (req, res) => {
    const {
        tipoCarga,
        domicilioRetiro,
        fechaRetiro,
        domicilioEntrega,
        fechaEntrega,
        fotos
    } = req.body

    let pedido = [tipoCarga, domicilioRetiro, fechaRetiro, domicilioEntrega, fechaEntrega, fotos]
    
    let transportistasEnZona = buscarTransportistas(pedido.localidad, pedido.provincia)

    const buscarTransportistas = (localidad, provincia) => {
        return transportistas.filter(transportista => 
            transportista.localidad === localidad && transportista.provincia === provincia
        )
    }

})