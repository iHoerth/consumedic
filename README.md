# PROYECTO FINAL 36a GRUPO 06

# CONSUMEDIC

---

## END-POINTS

### Endpoints de medicos

1. GET /medics ----> todos los medicos
2. GET /medics/id ----> medico por ID
3. GET /medics?email=... -----> traer medicos o medico por nombre
4. POST /medics ----> dar de alta un usuario de medico nuevo.
5. PUT /medics ----> para dar "de baja" un medico (osea pasarlo a inactivo, por eso put y no delete)

### Endpoints de pacientes

1. GET /patients ----> trae todos los pacientes
2. GET /patients?email=... -----> trae paciente o pacientes por nombre
3. POST /patients ----> dar de alta 1 nuevo usuario de paciente
4. PUT /patients ----> dar de baja 1 paciente

### Endpoints de utilidades (obra social y especialidad)

1. GET /socialSecurity ----> trae todas las obras sociales
2. GET /specialties -----> trae todas las especialidades

---

## UTILIZACION DEL CONTEXT

Primero debemos importar el hook useContext de React, y el Context a utilizar desde el ContextProvider.jsx, de la sig forma:

```
import { useContext } from 'react';
import { Context } from '../../context/ContextProvider';
```

Luego, debemos declarar una variable y pasarle la referencia de la llamada del hook useContext pasandole por parametro el Contexto a utilizar:
Tengamos en cuenta, que en la implementacion actual, el Context principal, nos trae un array de dos objetos: [doctorsData, patientsData] 

```
const data = useContext(Context)
```

De modo que data tiene la siguiente pinta:

```
 data == [{...},{...}]
```

Donde data[0] sera un objeto que almacena el estado completo de doctores, y data[1] el estado completo de pacientes. 
Para ver la estructura de doctorsData o patientsData, pueden ir a ContextProvider y chequear como declare los estados, pero c/u es un obj
que se ve mas o menos asi:

```
doctorsData == {
    doctors: [],
    doctorDetail: {},
    filteredDoctors: [],
    fetchDoctors: async () => {},
    fetchDoctorById: async (id) => {... cuerpo de la fn},
    fetchDoctorByEmail: async (email) => {... cuerpo de la fn},
    cleanDetail: async () => {... cuerpo de la fn},
    createDoctor: async (newDoctor) => {... cuerpo de la fn},
    filterDoctors: async (newFilter) => {... cuerpo de la fn},
  }
```

Volviendo a la utilizacion e importacion, podemos destructurar y solamente quedarnos con lo que nos interesa del objeto, para codigo mas limpio.


```
const {doctors , fetchDoctors} = useContext(Context)[0]  // ----> la posicion [0] seria doctorsData, y la pos [1] seria patientsData
```

En ese ejemplo, el componente se trae los doctores y la funcion que fetchea todos los doctores. Ahora tenemos nuestra propia funcion fetchDoctors() y nuestro array doctors en ese componente.

Luego podriamos hacer algo como por ejemplo:

```
useEffect(() => {
  fetchDoctors()
}, [])
```

Y una vez se montara el componente, estariamos trayendonos todos los doctores del back.
