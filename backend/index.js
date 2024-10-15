import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

//Definición del puerto para escuchar el backend
const PORT = 3001;

//Creación de aplicación backend
const app = express();
app.use(cors()); // Permitir solicitudes desde el frontend
app.use(express.json());

//Creación del transporter para enviar los mails
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.REACT_APP_NODEMAILER_USER,
      pass: process.env.REACT_APP_NODEMAILER_PASSWORD
    },
    pool: true, // Activar el pool de conexiones
    maxConnections: 3, // Limitar a 3 conexiones concurrentes
    rateLimit: 30 // Limitar a 30 mensajes por minuto
  })

//Ruta para enviar los mails
app.post('/send-email', async (req, res) => {
  const datosMensaje = req.body;
  try {
    const result = await transporter.sendMail({
      from: `"Tango App" <${process.env.REACT_APP_NODEMAILER_USER}>`,
      to: datosMensaje.mails,
      subject: "Nuevo Pedido de Transporte",
      html: datosMensaje.htmlMessage
    })
    res.status(200).send('Correo enviado correctamente');
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

//Mensaje de confirmación de backend escuchando en el puerto definido
app.listen(PORT, () => {
  console.log(`Backend ejecutándose en puerto ${PORT}`);
});
