import React from 'react';
import Card from '../Card/Card';
import style from './CardsContainer.module.css';

const CardsContainer = ({ doctorsInPage }) => {
  const message = 'no hay medicos';
  const medicos = [
    {
      name: 'Dr. Juan Pérez',
      profileImage:
        'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/5KCVGAGSP5HFJA7KMALNP7ITS4.jpg',
      specialty: 'Cardiología',
      infoStudies: 'Médico especialista en cardiología con más de 10 años de experiencia',
      opinions: ['Excelente médico', 'Muy atento con los pacientes'],
      location: 'Ciudad de México',
      price: 1500,
      agenda: ['Lunes - Viernes 9:00am - 1:00pm', 'Sábados 9:00am - 12:00pm'],
      stars: 2,
    },
    {
      name: 'Dra. Ana García',
      profileImage:
        'https://img.freepik.com/foto-gratis/hermosa-joven-doctora-mirando-camara-oficina_1301-7807.jpg?w=2000',
      specialty: 'Pediatría',
      infoStudies: 'Médico especialista en pediatría con más de 15 años de experiencia',
      opinions: ['Muy buena atención a los niños', 'Explica muy bien el diagnóstico'],
      location: 'Guadalajara, Jalisco',
      price: 1200,
      agenda: ['Lunes - Viernes 8:00am - 2:00pm', 'Sábados 8:00am - 12:00pm'],
      stars: 5,
    },
    {
      name: 'Dr. Luisa Martínez',
      profileImage:
        'https://www.topdoctors.es/files/Image/large/f570072560cbf0828355f8df1c7bff7d.jpg',
      specialty: 'Dermatología',
      infoStudies: 'Médico especialista en dermatología con más de 8 años de experiencia',
      opinions: ['Me ayudó a solucionar mi problema de acné', 'Muy profesional en su trato'],
      location: 'Monterrey, Nuevo León',
      price: 2000,
      agenda: ['Lunes - Viernes 10:00am - 2:00pm', 'Sábados 10:00am - 12:00pm'],
      stars: 2.5,
    },
    {
      name: 'Dr. María López',
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ64P5700N7X_1SWryJQ9vPhj9tKXt4qZTVNg&usqp=CAU',
      specialty: 'Oftalmología',
      infoStudies: 'Médico especialista en oftalmología con más de 12 años de experiencia',
      opinions: ['Excelente médico', 'Explica muy bien los tratamientos'],
      location: 'Madrid, España',
      price: 1800,
      agenda: ['Lunes - Viernes 9:00am - 2:00pm', 'Sábados 9:00am - 12:00pm'],
      stars: 3,
    },
    {
      name: 'Dr. Javier Ramírez',
      profileImage:
        'https://static.studyusa.com/article/aws_9CZM8SOpRgaVQQ1MnX8HxiuLzY8AOMoD_sm_2x.jpg?format=webp',
      specialty: 'Cirugía General',
      infoStudies: 'Médico especialista en cirugía general con más de 15 años de experiencia',
      opinions: ['Muy profesional en su trabajo', 'Muy atento con los pacientes'],
      location: 'Buenos Aires, Argentina',
      price: 2500,
      agenda: ['Lunes - Viernes 8:00am - 1:00pm', 'Sábados 8:00am - 12:00pm'],
      stars: 3.5,
    },
    {
      name: 'Dra. Claudia Sánchez',
      profileImage:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ64P5700N7X_1SWryJQ9vPhj9tKXt4qZTVNg&usqp=CAU',
      specialty: 'Psiquiatría',
      infoStudies: 'Médico especialista en psiquiatría con más de 10 años de experiencia',
      opinions: ['Muy empática con los pacientes', 'Me ha ayudado a superar mi depresión'],
      location: 'Santiago, Chile',
      price: 2000,
      agenda: ['Lunes - Viernes 10:00am - 3:00pm', 'Sábados 10:00am - 1:00pm'],
      stars: 4,
    },
  ];
  const allMedicos = doctorsInPage.length ? (
    <div className={style.divCards}>
      {doctorsInPage.map((doctor) => (
        <Card
          key={doctor.id}
          id={doctor.id}
          profileImage={doctor.imagen}
          name={doctor.nombre + ' ' + doctor.apellido}
          lastName={doctor.apellido}
          specialty={doctor.Especialidads.reduce((acc, ele) => acc + ele + ' ', '')}
          infoStudies={doctor.infoStudies}
          opinions={doctor.opinions}
          location={doctor.location}
          price={doctor.price}
          agenda={doctor.agenda}
          stars={doctor.stars}
        />
      ))}
    </div>
  ) : (
    <p>{message}</p>
  );
  return <div className={style.divBody}>{allMedicos}</div>;
};

export default CardsContainer;
