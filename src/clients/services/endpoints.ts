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
  setDefaultAddress: "/users/hacer_predeterminado_direccion",
  setDefaultPaymentMethod: "/users/hacer_predeterminado_metodo_pago"
} as const;


export const CARRITO_ENDPOINTS = {
  getCart: "/users/detalle_carrito",
  updateQuantityDetailCart: "/users/actualizar_cantidad_detalle_carrito",
  deleteDetailCart: "/users/eliminar_detalle_carrito",
  summaryCart: "/users/resumen_carrito",


} as const;
