const {Horario, DoctorType}= require("../../db")

const createHorarios = async (idMedico, agenda)=>{
    const newDoctor = await DoctorType.findByPk(idMedico);
    for (let i=0; i<agenda.length; i++){
        const newHorario = await Horario.create({
            dia_semana: agenda[i].dia_semana,
            atiende: agenda[i].atiende, 
            horario_inicio: agenda[i].horario_inicio,
            horario_fin: agenda[i].horario_fin,
            duracion_turno: agenda[i].duracion_turno,
            DoctorTypeId: newDoctor.id
        })
    }
    return agenda;
}

module.exports = { createHorarios };



// agenda = [
//     {   
//         dia_semana: "Lunes",
//         atiende: "si", 
//         horario_inicio: "9:00:00",
//         horario_fin: "15:00:00",
//         duracion_turno: "0:30:00"
//     },
//     {   
//         dia_semana: "Martes",
//         atiende: "si", 
//         horario_inicio: "9:00:00",
//         horario_fin: "15:00:00",
//         duracion_turno: "0:30:00"
//     },
//     {   
//         dia_semana: "Miercoles",
//         atiende: "si", 
//         horario_inicio: "9:00:00",
//         horario_fin: "15:00:00",
//         duracion_turno: "0:30:00"
//     },
//     {   
//         dia_semana: "Jueves",
//         atiende: "si", 
//         horario_inicio: "9:00:00",
//         horario_fin: "15:00:00",
//         duracion_turno: "0:30:00"
//     },
//     {   
//         dia_semana: "Viernes",
//         atiende: "si", 
//         horario_inicio: "9:00:00",
//         horario_fin: "15:00:00",
//         duracion_turno: "0:30:00"
//     },
//     {   
//         dia_semana: "Sabado",
//         atiende: "no", 
//     },
//     {   
//         dia_semana: "Domingo",
//         atiende: "no", 
//     },
// ]



//! insomnia

// {
// 	"idMedico": 1,
// 	"agenda" : [{   
//         "dia_semana": "Lunes",
//         "atiende": "si", 
//         "horario_inicio": "9:00:00",
//         "horario_fin": "15:00:00",
//         "duracion_turno": "0:30:00"
//     },{   
//         "dia_semana": "Martes",
//         "atiende": "si", 
//         "horario_inicio": "9:00:00",
//         "horario_fin": "15:00:00",
//         "duracion_turno": "0:30:00"
//     },{   
//         "dia_semana": "Miercoles",
//         "atiende": "si", 
//         "horario_inicio": "9:00:00",
//         "horario_fin": "15:00:00",
//         "duracion_turno": "0:30:00"
//     },{   
//         "dia_semana": "Jueves",
//         "atiende": "si", 
//         "horario_inicio": "9:00:00",
//         "horario_fin": "15:00:00",
//         "duracion_turno": "0:30:00"
//     },{   
//         "dia_semana": "Viernes",
//         "atiende": "si", 
//         "horario_inicio": "9:00:00",
//         "horario_fin": "15:00:00",
//         "duracion_turno": "0:30:00"
//     },{   
//         "dia_semana": "Sabado",
//         "atiende": "no" 
//     },{   
//         "dia_semana": "Domingo",
//         "atiende": "no"
//     }]
// }
