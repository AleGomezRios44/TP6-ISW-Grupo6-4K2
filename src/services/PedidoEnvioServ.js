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
        localidad: 'Rafaela',
        provincia: 'Santa Fe',
        email: 'maria.garcia@example.com'
    },
    {
        nombre: 'Carlos López',
        localidad: 'San Rafael',
        provincia: 'Mendoza',
        email: 'carlos.lopez@example.com'
    },
    {
        nombre: 'Ana Fernández',
        localidad: 'Cafayate',
        provincia: 'Salta',
        email: 'ana.fernandez@example.com'
    },
    {
        nombre: 'Luis Martínez',
        localidad: 'Mar del Plata',
        provincia: 'Buenos Aires',
        email: 'luis.martinez@example.com'
    },
    {
        nombre: 'Sofía Torres',
        localidad: 'Tandil',
        provincia: 'Buenos Aires',
        email: 'sofia.torres@example.com'
    },
    {
        nombre: 'Miguel Sánchez',
        localidad: 'Pocito',
        provincia: 'San Juan',
        email: 'miguel.sanchez@example.com'
    },
    {
        nombre: 'Laura Gómez',
        localidad: 'Villa Mercedes',
        provincia: 'San Luis',
        email: 'laura.gomez@example.com'
    },
    {
        nombre: 'Pedro Ramírez',
        localidad: 'San Martín de los Andes',
        provincia: 'Neuquén',
        email: 'pedro.ramirez@example.com'
    },
    {
        nombre: 'Lucía Díaz',
        localidad: 'Yerba Buena',
        provincia: 'Tucumán',
        email: 'lucia.diaz@example.com'
    },
    {
        nombre: 'Jorge Herrera',
        localidad: 'Goya',
        provincia: 'Corrientes',
        email: 'jorge.herrera@example.com'
    },
    {
        nombre: 'Elena Ruiz',
        localidad: 'General Pico',
        provincia: 'La Pampa',
        email: 'elena.ruiz@example.com'
    },
    {
        nombre: 'Fernando Castro',
        localidad: 'Presidencia Roque Sáenz Peña',
        provincia: 'Chaco',
        email: 'fernando.castro@example.com'
    },
    {
        nombre: 'Valentina Rojas',
        localidad: 'Oberá',
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