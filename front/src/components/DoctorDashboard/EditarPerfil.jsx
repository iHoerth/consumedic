import { useState, useContext, useEffect } from "react";
import { Context } from '../../context/ContextProvider';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button, Box, Typography, Divider } from '@mui/material';



const EditarPerfil = ({doctorDetail}) => {
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
    }, [loading]);

    return ( 
        <>
            Hola
        </>
    )
}
export default EditarPerfil