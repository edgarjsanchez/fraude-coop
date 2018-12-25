import axios from "axios";

var axiosrequest = axios.create();
axiosrequest.defaults.timeout = 2500;

export default {
  user: {
    login: credentials =>
      axiosrequest
        .post("http://192.168.89.130:8888/api/auth", { credentials })
        .then(res => res.data.user),
    getCuentas: cliente =>
      axiosrequest
        .post("http://192.168.89.130:8888/api/cuentas", { cliente })
        .then(res => res.data.cuentas),
    getPrestamos: cliente =>
      axiosrequest
        .post("http://192.168.89.130:8888/api/prestamos", { cliente })
        .then(res => res.data.prestamos)
  }
};
