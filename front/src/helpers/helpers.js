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
  {
    label: '',
    imgPath: '/images/1.jpg',
  },
  {
    label: '',
    imgPath: '/images/10.jpg',
  },
];

export const homeCards = [
  {
    title: `Encontrá tu especialista`,
    body: `Encuentra al especialista que mejor se adapte a tus necesidades de salud. En Consumedic, contamos con miles de perfiles de profesionales de la salud verificados. Lee las opiniones reales de miles de pacientes para tomar siempre la mejor decisión y confiar en tu elección.`,
  },
  {
    title: `Pedí turno de forma fácil`,
    body: `Agenda una cita médica de manera rápida y sencilla. En Consumedic, puedes elegir la hora que más te convenga y solicitar un turno sin necesidad de realizar una llamada telefónica. Nuestro sistema de reserva de turnos es fácil de usar, cómodo y te permite gestionar tus citas médicas de manera eficiente.`,
  },
  {
    title: `Recordatorios por SMS`,
    body: `Mantente al tanto de tus citas médicas de manera conveniente. En Consumedic, una vez que reserves tu turno, recibirás una confirmación instantánea y un recordatorio por mensaje de texto (SMS) antes de tu cita. Así, nunca olvidarás tus compromisos médicos y podrás organizarte mejor.`,
  },
  {
    title: `Sin costes añadidos`,
    body: `En Consumedic, la reserva de turnos es un servicio completamente gratuito. No tendrás que pagar ningún costo adicional por utilizar nuestra plataforma para agendar tus citas médicas. Nuestro objetivo es facilitar el acceso a la atención médica de calidad sin cargos adicionales para los pacientes.`,
  },
];

export const members = [
  {
    id:1,
    name: 'Facundo Aragon',
    role: 'Backend',
    img: 'https://st2.depositphotos.com/1036149/6135/i/600/depositphotos_61353241-stock-photo-fun-cartoon-doctor.jpg',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id:2,
    name: 'Matias Bustamante',
    role: 'Frontend',
    img: 'https://static.vecteezy.com/system/resources/thumbnails/001/613/072/small/handsome-male-doctor-with-medical-icons-vector.jpg',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id:3,
    name: 'Rolando Egusquiza',
    role: 'Backend',
    img: 'https://previews.123rf.com/images/poemsuk/poemsuk1703/poemsuk170300004/73091078-profesional-m%C3%A9dico-en-traje-de-escribir-registros-m%C3%A9dicos-al-portapapeles-ilustraci%C3%B3n-de-vector-de.jpg',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id:4,
    name: 'Mauro Gatica',
    role: 'Backend',
    img: 'https://i.pinimg.com/236x/d7/64/18/d76418f406971b8b0c02d158e159d920.jpg',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id:5,
    name: 'Bruno Gonzales',
    role: 'Frontend',
    img: 'https://png.pngtree.com/png-vector/20201223/ourlarge/pngtree-minimalistic-flat-cartoon-doctor-character-vector-elements-png-image_2592814.jpg',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id:6,
    name: 'Ignacio Hoerth',
    role: 'Frontend',
    img: 'https://previews.123rf.com/images/poemsuk/poemsuk1703/poemsuk170300004/73091078-profesional-m%C3%A9dico-en-traje-de-escribir-registros-m%C3%A9dicos-al-portapapeles-ilustraci%C3%B3n-de-vector-de.jpg',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com/in/ignaciohoerth/',
    github: 'https://github.com/iHoerth/',
  },
  {
    id:7,
    name: 'Noelia Paz',
    role: 'Frontend',
    img: 'https://i.pinimg.com/originals/7d/26/20/7d2620be930884afa132b5172a82d562.jpg',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    id:8,
    name: 'Gaston Vilte',
    role: 'Frontend',
    img: 'https://previews.123rf.com/images/graphicbee/graphicbee1707/graphicbee170700064/83666954-alegre-m%C3%A9dico-masculino-haciendo-gestos-ilustraci%C3%B3n-vectorial-de-un-m%C3%A9dico-con-el-portapapeles-y.jpg',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
];
