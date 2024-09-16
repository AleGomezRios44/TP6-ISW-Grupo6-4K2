let pedidosEnvio = []

const transportistasMock = [
    {
        nombre: 'Juan Pérez',
        localidad: 'villa carlos paz',
        provincia: 'Córdoba',
        email: 'juan.perez@example.com'
    },
    {
        nombre: 'María García',
        localidad: 'rafaela',
        provincia: 'Santa Fe',
        email: 'maria.garcia@example.com'
    },
    {
        nombre: 'Carlos López',
        localidad: 'san rafael',
        provincia: 'Mendoza',
        email: 'carlos.lopez@example.com'
    },
    {
        nombre: 'Ana Fernández',
        localidad: 'cafayate',
        provincia: 'Salta',
        email: 'ana.fernandez@example.com'
    },
    {
        nombre: 'Luis Martínez',
        localidad: 'mar del plata',
        provincia: 'Buenos Aires',
        email: 'luis.martinez@example.com'
    },
    {
        nombre: 'Sofía Torres',
        localidad: 'tandil',
        provincia: 'Buenos Aires',
        email: 'sofia.torres@example.com'
    },
    {
        nombre: 'Miguel Sánchez',
        localidad: 'pocito',
        provincia: 'San Juan',
        email: 'miguel.sanchez@example.com'
    },
    {
        nombre: 'Laura Gómez',
        localidad: 'villa mercedes',
        provincia: 'San Luis',
        email: 'laura.gomez@example.com'
    },
    {
        nombre: 'Pedro Ramírez',
        localidad: 'san martín de los andes',
        provincia: 'Neuquén',
        email: 'pedro.ramirez@example.com'
    },
    {
        nombre: 'Lucía Díaz',
        localidad: 'yerba buena',
        provincia: 'Tucumán',
        email: 'lucia.diaz@example.com'
    },
    {
        nombre: 'Jorge Herrera',
        localidad: 'goya',
        provincia: 'Corrientes',
        email: 'jorge.herrera@example.com'
    },
    {
        nombre: 'Elena Ruiz',
        localidad: 'general pico',
        provincia: 'La Pampa',
        email: 'elena.ruiz@example.com'
    },
    {
        nombre: 'Fernando Castro',
        localidad: 'presidencia roque sáenz peña',
        provincia: 'Chaco',
        email: 'francomf343@gmail.com'
    },
    {
        nombre: 'Valentina Rojas',
        localidad: 'oberá',
        provincia: 'Misiones',
        email: 'valentina.rojas@example.com'
    }
];

const guardarDatos = (pedidoEnvio) => {
    pedidosEnvio.push(pedidoEnvio)
    const transportistas = buscarTransportistas(pedidoEnvio.domicilioRetiro.localidad, pedidoEnvio.domicilioRetiro.provincia)
    //funcion de enviar mails()
}

const buscarTransportistas = (localidad, provincia) => {
    return transportistasMock.filter(transportista => 
        transportista.localidad === localidad && transportista.provincia === provincia
    )
}

const PedidoEnvioServices = {
    guardarDatos
}

export default PedidoEnvioServices