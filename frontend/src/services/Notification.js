//Import de axios para la consulta
import axios from "axios";
  
  //Comunicación con el backend para enviar las notificaciones por mail
  const enviarNotificacion = async (datosMensaje) => {
    return axios({
      method: "post",
      url: 'https://tp-6-isw-grupo6-4-k2-prdbdza54-alejandros-projects-91ff5564.vercel.app/send-email',
      headers: {},
      data: datosMensaje,
    })
  };
  
  const NotificationService = {
    enviarNotificacion,
  };

//Export de la funcion para notificar
export default NotificationService;