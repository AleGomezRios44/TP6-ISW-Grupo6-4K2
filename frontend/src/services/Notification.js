  import axios from "axios";
  
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

export default NotificationService;