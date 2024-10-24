import NotificationService from './Notification';

let pedidosEnvio = [];

const transportistasMock = [
  {
    nombre: "Juan Pérez",
    localidad: "villa carlos paz",
    provincia: "Córdoba",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Pedro Pérez",
    localidad: "cordoba",
    provincia: "Córdoba",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Raúl Pérez",
    localidad: "cordoba",
    provincia: "Córdoba",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "María García",
    localidad: "rafaela",
    provincia: "Santa Fe",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Carlos López",
    localidad: "san rafael",
    provincia: "Mendoza",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Ana Fernández",
    localidad: "cafayate",
    provincia: "Salta",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Luis Martínez",
    localidad: "mar del plata",
    provincia: "Buenos Aires",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Sofía Torres",
    localidad: "tandil",
    provincia: "Buenos Aires",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Miguel Sánchez",
    localidad: "pocito",
    provincia: "San Juan",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Laura Gómez",
    localidad: "villa mercedes",
    provincia: "San Luis",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Pedro Ramírez",
    localidad: "san martin de los andes",
    provincia: "Neuquén",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Lucía Díaz",
    localidad: "yerba buena",
    provincia: "Tucumán",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Jorge Herrera",
    localidad: "goya",
    provincia: "Corrientes",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Elena Ruiz",
    localidad: "general pico",
    provincia: "La Pampa",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Fernando Castro",
    localidad: "presidencia roque sáenz peña",
    provincia: "Chaco",
    email: "tomasmalamud@gmail.com",
  },
  {
    nombre: "Valentina Rojas",
    localidad: "obera",
    provincia: "Misiones",
    email: "tomasmalamud@gmail.com",
  },
];

const guardarDatos = async (pedidoEnvio) => {
  pedidosEnvio.push(pedidoEnvio);
  let mails = []
  const transportistas = buscarTransportistas(
    pedidoEnvio.domicilioRetiro.localidad,
    pedidoEnvio.domicilioRetiro.provincia
  );
  for(let i = 0; i < transportistas.length; i++){
    mails.push(transportistas[i].email)
  }
  return await enviarMail(pedidoEnvio, mails)
};

const buscarTransportistas = (localidadRetiro, provinciaRetiro, localidadEntrega, provinciaEntrega) => {
  return transportistasMock.filter(
    (transportista) =>
      (transportista.localidad === localidadRetiro &&
      transportista.provincia === provinciaRetiro) ||
      (transportista.localidad === localidadEntrega &&
        transportista.provincia === provinciaEntrega)
  );
};

const enviarMail = async (pedidoEnvio, mails) => {
  // Iniciar la sección de las imágenes vacía
  let imagenesHtml = '';

  // Comprobar si el array de imágenes existe y tiene al menos un elemento
  if (pedidoEnvio.imagenes && pedidoEnvio.imagenes.length > 0) {
    imagenesHtml = '<h3>Imágenes del pedido</h3>';
    
    // Recorrer el array de imágenes y agregar las etiquetas <img> al HTML
    pedidoEnvio.imagenes.forEach((imagenUrl, index) => {
      imagenesHtml += `<p><strong>Imagen ${index + 1}:</strong></p>`;
      imagenesHtml += `<img src="${imagenUrl}" alt="Imagen ${index + 1}" style="max-width: 100%; height: auto;" />`;
    });
  }

  const message = `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pedido de transporte</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ddd;
      }
      h1 {
        color: #03045E;
      }
      p {
        margin-bottom: 10px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Pedido de envío</h1>
      <h3>Domicilio de retiro</h3>
      <p><strong>Dirección:</strong> ${pedidoEnvio.domicilioRetiro.calle + ' ' + pedidoEnvio.domicilioRetiro.altura}</p>
      <p><strong>Localidad:</strong> ${pedidoEnvio.domicilioRetiro.localidad}</p>
      <p><strong>Provincia:</strong> ${pedidoEnvio.domicilioRetiro.provincia}</p>
      <p><strong>Departamento:</strong> ${pedidoEnvio.domicilioRetiro.dpto}</p>
      <p><strong>Referencia:</strong> ${pedidoEnvio.domicilioRetiro.referencia}</p>
      <h3>Domicilio de entrega</h3>
      <p><strong>Dirección:</strong> ${pedidoEnvio.domicilioEntrega.calle + ' ' + pedidoEnvio.domicilioEntrega.altura}</p>
      <p><strong>Localidad:</strong> ${pedidoEnvio.domicilioEntrega.localidad}</p>
      <p><strong>Provincia:</strong> ${pedidoEnvio.domicilioEntrega.provincia}</p>
      <p><strong>Departamento:</strong> ${pedidoEnvio.domicilioEntrega.dpto}</p>
      <p><strong>Referencia:</strong> ${pedidoEnvio.domicilioEntrega.referencia}</p>
      <h3>Entrega:</h3>
      <p><strong>Fecha retiro:</strong> ${pedidoEnvio.fechaRetiro}</p>
      <p><strong>Fecha entrega:</strong> ${pedidoEnvio.fechaEntrega}</p>
      <p><strong>Tipo de carga:</strong> ${pedidoEnvio.carga}</p>
      ${imagenesHtml}
    </div>
  </body>
  </html>`;

  const result = await NotificationService.enviarNotificacion({
    mails: mails,
    htmlMessage: message,
  });
  return result;
};

const PedidoEnvioServices = {
  guardarDatos,
};

export default PedidoEnvioServices;
