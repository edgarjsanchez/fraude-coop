import axios from "axios";

var axiosrequest = axios.create();
axiosrequest.defaults.timeout = 2500;

export default {
  user: {
    login: credentials =>
      axiosrequest
        .post("http://192.168.89.130:8888/api/auth", { credentials })
        .then(res => res.data.user),
    getViajes: cliente =>
      axiosrequest
        .post("http://192.168.89.130:8888/api/viajes", { cliente })
        .then(res => res.data.viajes),
    putViaje: viaje =>
      axiosrequest
        .put("http://192.168.89.130:8888/api/viajes", { viaje })
        .then(res => res.data),
    deleteViaje: key =>
      axiosrequest
        .delete(`http://192.168.89.130:8888/api/viajes/${key}`)
        .then(res => res.data),
    updateViaje: viaje =>
      axiosrequest
        .post(`http://192.168.89.130:8888/api/viajes/${viaje.key}`, { viaje })
        .then(res => res.data)
  }
};
