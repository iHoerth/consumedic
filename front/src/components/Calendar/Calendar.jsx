import React from "react";
import { useEffect } from "react";

import axios from "axios"

import { useTheme } from "@mui/material";



const Calendar = ({id}) => {

    const [calendar, setCalendar] = React.useState([]);
    const theme = useTheme();
    
    useEffect(()=>{
        const bringCalendar = async(id)=>{
            console.log(id);
            const data = await axios.get(`http://localhost:3001/appointments/calendar/${id}`)
            return data.data;
        }
        const data = bringCalendar(id)
        setCalendar(data)
        console.log(calendar);
    }, [] );

    console.log(calendar);
    return (
      <>
        {calendar.length ? calendar.map(turno=>{
            return <div>{turno.fecha}</div>
        }) : null}
      </>
    );
  };
  
  export default Calendar;
  