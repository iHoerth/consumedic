import React from 'react'
import { useState } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Box, Paper, Typography } from '@mui/material';
// import { makeStyles } from '@mui/material';
// import DatePicker from '@mui/lab/DatePicker';

// import 
// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

const NewUserForm = () => {
    //   const classes = useStyles();
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState(null);
    const [insurance, setInsurance] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleBirthdateChange = (date) => {
        setBirthdate(date);
    };

    const handleInsuranceChange = (event) => {
        setInsurance(event.target.value);
    };

    const handleDocumentNumberChange = (event) => {
        setDocumentNumber(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí se podría enviar la información del nuevo usuario a un servidor
        console.log({ name, birthdate, insurance, documentNumber });
    };

    return (
        <Box component={Paper} elevation={5}
            sx={{ width: '300px', display:'flex', justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'column'}} >
            <form onSubmit={handleSubmit}>
                <Typography variant='h6' align='center'>Crear nuevo usuario</Typography>
                <TextField
                    id="name"
                    label="Nombre"
                    color='secondary'
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <br />
                <br />
                {/* <DatePicker
                    label="Fecha de nacimiento"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    format="dd/MM/yyyy"
                    required
                /> */}
                <br />
                <br />
                <FormControl required>
                    <InputLabel id="insurance-label" 
                        color='secondary'>Obra social</InputLabel>
                    <Select style={{ width: '200px' }}
                        labelId="insurance-label"
                        id="insurance"
                        color='secondary'
                        value={insurance}
                        onChange={handleInsuranceChange}
                    >
                        <MenuItem value={'OSDE'}>OSDE</MenuItem>
                        <MenuItem value={'Swiss Medical'}>Swiss Medical</MenuItem>
                        <MenuItem value={'Galeno'}>Galeno</MenuItem>
                        <MenuItem value={'Otra'}>Otra</MenuItem>
                    </Select>

                    <br />
                    <br />
                    <TextField
                        id="document-number"
                        label="Número de documento"
                        type="number"
                        color='secondary'
                        value={documentNumber}
                        onChange={handleDocumentNumberChange}
                        required
                        sx={{

                        }}
                    />
                    <br />
                    <br />
                    <Button
                        // className={classes.button}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Crear usuario
                    </Button>
                </FormControl>
            </form>
        </Box>

    );
};

export default NewUserForm;
