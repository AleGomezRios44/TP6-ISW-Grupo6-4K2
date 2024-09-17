//Import de axios para la consulta
import axios from "axios";
  
  //Comunicación con el backend para enviar las notificaciones por mail
  const enviarNotificacion = async (datosMensaje) => {
    return axios({
      method: "post",
      url: 'http://localhost:3001/send-email',
      headers: {},
      data: datosMensaje,
    })
  };
  
  const NotificationService = {
    enviarNotificacion,
  };

//Export de la funcion para notificar
export default NotificationService;