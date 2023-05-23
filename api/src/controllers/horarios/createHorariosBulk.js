const {Horario, DoctorType}= require("../../db")

const createHorariosBulk = async (agenda, id)=>{
    const newDoctor = await DoctorType.findByPk(id);
    
    await Horario.destroy({
        where:{
            DoctorTypeId: id
        }
    });

    if(newDoctor){
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
    else{
        throw new Error("no esxiste doctor con ese ID")
    }
}

module.exports = { createHorariosBulk };


// [
// 	{
// 		"id": 1,
// 		"dia_semana": "Domingo",
// 		"atiende": "si",
// 		"horario_inicio": "09:00:00",
// 		"horario_fin": "16:00:00",
// 		"duracion_turno": "00:30:00",
// 		"DoctorTypeId": 1
// 	},
// 	{
// 		"id": 2,
// 		"dia_semana": "Lunes",
// 		"atiende": "si",
// 		"horario_inicio": "11:00:00",
// 		"horario_fin": "18:00:00",
// 		"duracion_turno": "00:30:00",
// 		"DoctorTypeId": 1
// 	},
// 	{
// 		"id": 3,
// 		"dia_semana": "Martes",
// 		"atiende": "si",
// 		"horario_inicio": "10:00:00",
// 		"horario_fin": "17:00:00",
// 		"duracion_turno": "00:30:00",
// 		"DoctorTypeId": 1
// 	},
// 	{
// 		"id": 4,
// 		"dia_semana": "Miércoles",
// 		"atiende": "no",
// 		"horario_inicio": null,
// 		"horario_fin": null,
// 		"duracion_turno": null,
// 		"DoctorTypeId": 1
// 	},
// 	{
// 		"id": 5,
// 		"dia_semana": "Jueves",
// 		"atiende": "si",
// 		"horario_inicio": "09:00:00",
// 		"horario_fin": "16:00:00",
// 		"duracion_turno": "00:30:00",
// 		"DoctorTypeId": 1
// 	},
// 	{
// 		"id": 6,
// 		"dia_semana": "Viernes",
// 		"atiende": "no",
// 		"horario_inicio": null,
// 		"horario_fin": null,
// 		"duracion_turno": null,
// 		"DoctorTypeId": 1
// 	},
// 	{
// 		"id": 7,
// 		"dia_semana": "Sábado",
// 		"atiende": "si",
// 		"horario_inicio": "10:00:00",
// 		"horario_fin": "17:00:00",
// 		"duracion_turno": "00:30:00",
// 		"DoctorTypeId": 1
// 	}
// ]


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
