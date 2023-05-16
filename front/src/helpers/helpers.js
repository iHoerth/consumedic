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

  // FEARDAS
  // {
  //   label: '',
  //   imgPath: '/images/7.jpg',
  // },
  // {
  //   label: '',
  //   imgPath: '/images/8.jpg',
  // },
  // {
  //   label: '',
  //   imgPath: '/images/11.jpg',
  // },
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
    name: 'Facundo Aragon',
    role: 'Backend',
    img: '',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo.',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    name: 'Matias Bustamante',
    role: 'Frontend',
    img: '',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo.',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    name: 'Rolando Egusquiza',
    role: 'Backend',
    img: '',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo.',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    name: 'Mauro Gatica',
    role: 'Backend',
    img: '',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo.',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    name: 'Bruno Gonzales',
    role: 'Frontend',
    img: '',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo.',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    name: 'Ignacio Hoerth',
    role: 'Frontend',
    img: '',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo.',
    linkedin: 'https://www.linkedin.com/in/ignaciohoerth/',
    github: 'https://github.com/iHoerth/',
  },
  {
    name: 'Noelia Paz',
    role: 'Frontend',
    img: '',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo.',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
  {
    name: 'Gaston Vilte',
    role: 'Frontend',
    img: '',
    description:
      'Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo. Texto descriptivo texto descriptivo.',
    linkedin: 'https://www.linkedin.com',
    github: 'https://github.com/',
  },
];
