

// funcion que devuelve el mensaje de un objeto error de una respuesta http
export function getError(error): string {
  error = error.error;
  if (error.detail) {
    return error.detail;
  } else {
    for (const prop in error) {
      if (true === Array.isArray(error[prop])) {
        return error[prop][0];
      } else {
        return error[prop];
      }
    }
    return error;
  }
}
