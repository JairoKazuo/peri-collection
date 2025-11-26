export const CLIENT_ENDPOINTS = {
  getPersonalInfo: "/users/datos_personales",
  getDirections: "/users/direcciones",
  getPaymentMethods: "/users/metodos_pago",
  updatePersonalInfo: "/users/update_datos_personales",
  updatePhone: "/users/update_telefono",
  insertDirection: "/users/insertar_direccion",
  deleteDirection: "/users/eliminar_direccion",
  insertPaymentMethod: "/users/insertar_metodo_pago",
  deletePaymentMethod: "/users/eliminar_metodo_pago",
} as const;
