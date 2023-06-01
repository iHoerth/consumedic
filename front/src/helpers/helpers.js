import { color } from '@mui/system';

export const calculateMaxPages = (allDoctors, doctorsPerPage, pages) => {
  for (let i = 1; i <= Math.ceil(allDoctors.length / doctorsPerPage); i++) {
    pages.push(i);
  }
};

export const FILTER_TYPES = {
  SPECIALTIES: 'Especialidads',
  SOCIAL_SECURITY: 'ObraSocials',
  APPOINTMENT: 'Cita',
  LOCATION: 'location',
};

export const bannerImages = [
  // {
  //   label: '',
  //   imgPath: '/images/1.jpg',
  // },
  {
    label: '',
    imgPath: '/images/10.jpg',
  },
];

export const homeCards = [
  {
    title: `Encontrá tu especialista`,
    body: `Las opiniones reales de miles de pacientes te ayudarán a tomar siempre la mejor decisión.`,
    backgroundColor: '#black',
  },
  {
    title: `Pedí turno de forma fácil`,
    body: `Elegí la hora que prefieras y pedí turno sin necesidad de llamar. Es fácil, cómodo y muy rápido.`,
  },
  {
    title: `Recordatorios por SMS`,
    body: `Te confirmamos el turno al instante y te enviamos un recordatorio por sms antes del turno.`,
  },
  {
    title: `Sin costes añadidos`,
    body: `La reserva de turno es un servicio gratuito de Consumedic.`,
  },
];

export const members = [
  {
    id: 2,
    phrase:
      '❝ Liberate del peso del pasado y rompe las cadenas de las etiquetas. Forja tu propio futuro con tu verdadera identidad ❞',
    name: 'Facundo Aragon',
    role: 'Backend',
    img: 'https://i.ibb.co/HFQrF87/facu.jpg',
    //description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com/in/facundo-aragon-00919459/',
    github: 'https://github.com/facuaragon',
  },

  //////////////////////////////////
  {
    id: 3,
    phrase:
      '❝ Pon el corazón, mente y el alma incluso en los actos más pequeños.Ese es el secreto del éxito ❞',
    name: 'Noelia Paz',
    role: 'Frontend',
    img: 'https://i.ibb.co/98H5xkg/noe.jpg',
    //description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com/in/noelia-paz-055a67238',
    github: 'https://github.com/Noelia-Paz',
  },
  //////////////////////////////

  {
    id: 6,
    name: 'Mauro Gatica',
    phrase: '❝ Fallar en planear es planear fallar ❞',
    role: 'Backend',
    img: 'https://i.ibb.co/WDc8Wkp/yo.jpg',
    //description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com/in/mauro-gatica-a5aba3163/',
    github: 'https://github.com/Maurog5',
  },

  ////////////////////////////////////////////////
  {
    id: 4,
    phrase: '❝ Siempre parece imposible hasta que esté hecho. ❞',
    name: 'Matias Bustamante',
    role: 'Frontend',
    img: 'https://i.ibb.co/PZ3S8Gg/matiii.jpg',
    //description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com/in/matias-bustamante-90ba9b274/',
    github: 'https://github.com/matibustamante7',
  },
  ///////////////////////////////////////
  {
    id: 5,
    phrase: '❝ La simplicidad es la clave de la brillantez ❞',
    name: 'Rolando Egusquiza',
    role: 'Backend',
    img: 'https://i.ibb.co/myr3XMG/roli.jpg',
    //description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com/in/roloegus',
    github: 'https://github.com/roloegus',
  },
  ///////////////////////////////////////
  {
    id: 1,
    phrase: '❝ El talento no es más que el fruto de las horas dedicadas. ❞',
    name: 'Ignacio Hoerth',
    role: 'Frontend',
    img: 'https://i.ibb.co/Br1ZVfb/igna.jpg',
    //description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com/in/ignaciohoerth/',
    github: 'https://github.com/iHoerth/',
  },
];
