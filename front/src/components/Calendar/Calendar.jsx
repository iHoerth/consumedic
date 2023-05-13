import React from "react";
import { useTheme } from "@mui/material";


const Calendar = ({id, calendar}) => {
    
    

    return (
      <>
        {calendar.map(dia=>(
          <div>
            <div>
              <h3>{dia.dia}</h3>
              <h5>{dia.fecha}</h5>
              <ul>
                {dia.atiende === "no" ? <p>No atiende este día</p> : dia.turnos.map(turno=><button>{turno.hora}</button>)}
              </ul>
            </div>
          </div>
        ))}
      </>
    );
  };
  
  export default Calendar;
  