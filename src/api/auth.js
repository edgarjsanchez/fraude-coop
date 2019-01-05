import api from "./api";

export const login = credentials => api.user.login(credentials);

export const getViajes = cliente => api.user.getViajes(cliente);

export const putViaje = viaje => api.user.putViaje(viaje);

export const deleteViaje = key => api.user.deleteViaje(key);
