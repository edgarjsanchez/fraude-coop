import axios from "axios";
import { URL } from "../../src/utils/environment";

var axiosrequest = axios.create();
axiosrequest.defaults.timeout = 2500;
export default {
  user: {
    login: credentials =>
      axiosrequest.post(URL.auth, { credentials }).then(res => res.data.user),
    getViajes: cliente =>
      axiosrequest.post(URL.viajes, { cliente }).then(res => res.data.viajes),
    putViaje: viaje =>
      axiosrequest.put(URL.viajes, { viaje }).then(res => res.data),
    deleteViaje: key =>
      axiosrequest.delete(URL.viajes + `/${key}`).then(res => res.data),
    updateViaje: viaje =>
      axiosrequest
        .post(URL.viajes + `/${viaje.key}`, { viaje })
        .then(res => res.data),
    getTarjetas: cliente =>
      axiosrequest
        .post(URL.tarjetas, { cliente })
        .then(res => res.data.tarjetas),
    inscripcion: credentials =>
      axiosrequest.post(URL.usuario, { credentials }).then(res => res.data)
  }
};
