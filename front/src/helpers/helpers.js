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
    id: 1,
    name: 'Ignacio Hoerth',
    role: 'Frontend',
    img: 'https://previews.123rf.com/images/poemsuk/poemsuk1703/poemsuk170300004/73091078-profesional-m%C3%A9dico-en-traje-de-escribir-registros-m%C3%A9dicos-al-portapapeles-ilustraci%C3%B3n-de-vector-de.jpg',
    description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com/in/ignaciohoerth/',
    github: 'https://github.com/iHoerth/',
  },
  {
    id: 3,
    name: 'Noelia Paz',
    role: 'Frontend',
    img: 'https://i.pinimg.com/originals/7d/26/20/7d2620be930884afa132b5172a82d562.jpg',
    description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id: 2,
    name: 'Facundo Aragon',
    role: 'Backend',
    img: 'https://st2.depositphotos.com/1036149/6135/i/600/depositphotos_61353241-stock-photo-fun-cartoon-doctor.jpg',
    description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id: 4,
    name: 'Matias Bustamante',
    role: 'Frontend',
    img: 'https://static.vecteezy.com/system/resources/thumbnails/001/613/072/small/handsome-male-doctor-with-medical-icons-vector.jpg',
    description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id: 5,
    name: 'Rolando Egusquiza',
    role: 'Backend',
    img: 'https://previews.123rf.com/images/poemsuk/poemsuk1703/poemsuk170300004/73091078-profesional-m%C3%A9dico-en-traje-de-escribir-registros-m%C3%A9dicos-al-portapapeles-ilustraci%C3%B3n-de-vector-de.jpg',
    description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id: 6,
    name: 'Mauro Gatica',
    role: 'Backend',
    img: 'https://i.pinimg.com/236x/d7/64/18/d76418f406971b8b0c02d158e159d920.jpg',
    description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id: 7,
    name: 'Bruno Gonzales',
    role: 'Frontend',
    img: 'https://png.pngtree.com/png-vector/20201223/ourlarge/pngtree-minimalistic-flat-cartoon-doctor-character-vector-elements-png-image_2592814.jpg',
    description: 'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  ,
];
