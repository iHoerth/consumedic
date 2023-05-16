import { useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    // con esto chequea que estemos efectivamente en el navegador
    if (typeof window === 'undefined') {
      //de no ser asi, retornamos el valor inicial, que probablemente sea un obj vacio
      return initialValue;
    }
    try {
      //mediante un try, tratamos XD de traer lo que se encuentre en el localStorage con esa key.
      const item = window.localStorage.getItem(key);
      // de no encontrar nada, retorna initial value
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // no entiendo bien en que casos, podria darte un error, pensaria que solo da undefined si no encuentra nada con esa key... 
      console.log(error);
      return initialValue;
    }
  });

  // aca define la segunda parte de la tupla, osea la fn que setea
  const setValue = (value) => {
    try {
      // no entiendo la sig linea de codigo, pregunta si value es una funcion y en cuyo caso quiere guardar su ejecucion para storedValue, no lo sigo.
      // Tal vez es porque los setState aceptan un cb como parametro, para manejar el estado previo?
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        // si el entorno es el navegador, seteamos la key con el objeto stringizado
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // retorna la tupla clasica de [state, setState] solo que lo almacenaria en el localStorage
  return [storedValue, setValue];
}

export default useLocalStorage;
