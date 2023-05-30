# /login

### con user:

1. no existe:
   - (!) no muestra alerta, no hace nada y tira 400.
2. existe:
   - (!) si la pass está mal, tira error en consola y no pasa nada.
   - (!) si la pass está bien, redirige pero no crea sesion

### con google:

1. no existe:
   - (!) lo crea y redirige, falta que pida completar datos.
2. existe:
   - redirige y crea sesion con exito

---

# /loginDoctor

### con user:

1. no existe:
   - (!) no muestra alerta, no hace nada y tira 400.
2. existe:
   - (!) si la pass está mal, tira error en consola y no pasa nada.
   - si la pass está bien redirige y crea sesion con exito

### con google:

1. no existe:
   - (!) lo crea y redirige, falta que pida completar datos.
2. existe:
   - redirige y crea sesion con exito

---

# /create

1. validacion
   - (!) esta validado por html
2. ya existe:
   - (!!) EXPLOTA.
3. no existe:
   - (!) lo crea y redirige pero no crea sesion en localstorage

---

# /createDoctor

1. validacion
   - (!) si no pones nada, tira un toast pero tmb tira el error en consola.
   - (!) si falta DESCRIPCION, no muestra alertas y deja hacer el submit  
2. no existe:
   - (!) lo crea pero no redirige ni crea sesion en localstorage
3. ya existe:
   - (!) muestra una alerta con el error del back (mal) y tira en clg error POST 400.

# Otros recorridos
## home --> search --> cita !
Aca tiene que pedirte que loguees

## home -> search -> cita -> pago realizado
Cuando volvemos al sitio, se pierden los datos del store y el medico es undefined undefined.
Tambien se pierden los del paciente entonces no se puede tocar IR A MI CUENTA


---

# UX / UI

## Login - LoginDoctor - Create - CreateDoctor
1. UX:
- Algunas Alertas y validacion en createDoctor. Resto 10/10

## NavBar
1. UX :
- ERES ADMIN? No deberia ser un boton. Si vos logueas y sos admin, deberia saberlo la app y mostrarte un boton ADMIN.

2. UI:
En las siguientes vistas, el navbar deberia ser solido azul (o del color primario que elijamos):
- /login
- /create
- /loginDoctor
- /createDoctor
- /search
Basicamente en TODAS MENOS HOME, que empieza transparente por el banner.

## Doctors List (/search)
1. UX:
- Tarjetas de medicos no muestran agenda.
2. UI:
- Tarjetas muy grandes.

## Panel paciente
1. UX / Funcionalidad:
- Muestra "cargando" si no hay datos.
- El nav de la izq esta medio bugueado

2. UI:
- No esta ajustado al ancho del contenido.

## Panel medico
1. UX:
- Creo que en MI PERFIL deberiamos poder ver los turnos proximos, o algo asi. Como un "RESUMEN"
2. UI:
- Faltaria ajustar todas sus semivistas al ancho y alto del contenido de la app
- Las tablas tienen distintos tamaños
- Tal vez probar de utilizar el color secundario en combinacion?

## Admin
1. UX:
- Quizas seria mejor traer una lista con todo (pacientes y doctores) y manejarlo todo con filtros desde una unica "vista". (hay que navegar a la izq para distintas cosas)
2. UI:
- El boton de eliminar podria ser otro

## About Us
Fotos frases y remover bruno ekis de XDD perdon bruno