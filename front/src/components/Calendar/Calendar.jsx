import React from "react";
import { useTheme } from "@mui/material";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

const Calendar = ({id, calendar}) => {
  const theme = useTheme();
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
    
    if(calendar){
      return (
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'row',
            bgcolor: 'background.paper'
          }}>
          {calendar.map(dia => { 
            let dd = dia.fecha.split("-")[2]
            let mm = meses[Number(dia.fecha.split("-")[1])-1] 

            return (
            <List>
              <ListItem disablePadding>
                <ListItemText primary={dia.dia} />
              </ListItem>
              <ListItem disablePadding>
                  <ListItemText primary={`${dd} ${mm}`} />
              </ListItem>
              <Divider />
              {dia.atiende === "si" ? 
                dia.turnos.map(turno=>{ return (
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemText primary={turno.hora} />
                    </ListItemButton>
                  </ListItem>
                )}) : 
                  <ListItem disablePadding>
                    <ListItemText primary="-" />
                  </ListItem>
              }
            </List>
          )})}
        </Box>
      );
    } else {
      return (
        <>
        </>
      )
    }
  };
  
  export default Calendar;
  