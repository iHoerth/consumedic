import React from 'react';
import { useState, useContext } from 'react';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Box, Paper, Typography, Checkbox } from '@mui/material';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import { Context } from '../../context/ContextProvider';

const CreatePatient = () => {

    // const patientsData = useContext()


    const [form, setForm] = useState({
        name: '',
        surname: '',
        insurance: '',
        dni: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState({
        name: '',
        surname: '',
        insurance: '',
        dni: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleFormChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        setForm({
            ...form,
            [property]: value
        });

        validateForm({ ...form, [property]: value })
    };

    function validateForm(form) {
        const errors = {};
      
        if (!form.name) {
          errors.name = 'El campo nombre es requerido';
        }
      
        if (!form.surname) {
          errors.surname = 'El campo apellido es requerido';
        }
      
        if (!form.email) {
          errors.email = 'El campo email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
          errors.email = 'El email ingresado no es válido';
        }
      
        if (!form.phone) {
          errors.phone = 'El campo teléfono es requerido';
        } else if (!/^\d{10}$/.test(form.phone)) {
          errors.phone = 'El número de teléfono debe contener 10 dígitos';
        }
      
        if (!form.insurance) {
          errors.insurance = 'El campo obra social es requerido';
        }
      
        if (!form.dni) {
          errors.dni = 'El campo número de documento es requerido';
        } else if (!/^\d{7,8}$/.test(form.dni)) {
          errors.dni = 'El número de documento debe contener entre 7 y 8 dígitos';
        }
      
        if (!form.password) {
          errors.password = 'El campo contraseña es requerido';
        } else if (form.password.length < 8) {
          errors.password = 'La contraseña debe contener al menos 8 caracteres';
        }
      
        if (!form.confirmPassword) {
          errors.confirmPassword = 'El campo confirmar contraseña es requerido';
        } else if (form.confirmPassword !== form.password) {
          errors.confirmPassword = 'Las contraseñas no coinciden';
        }   
        setError(errors);
        return Object.keys(errors).length === 0;
      }
      
      
      function handleSubmit(event) {
        event.preventDefault();
        const errors = validateForm(form);
        setError(errors);
        
        axios.post('http://localhost:3001/patients', form)
        .then(res=> alert('paciente creado: ' + res.data))
        .catch(err => alert('error: '+ err.message))
        
        if (Object.keys(errors).length === 0) {
          // Envío del formulario
        }
      }
      

    const handleCheckedPassword = () => {
        if (form.password !== form.confirmPassword) {
            setError({ ...error, confirmPassword: 'Las contraseñas no coinciden' });
        } else {
            setError({ ...error, confirmPassword: '' });
        }
    };



    
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // const verpatients=()=>{
    //   console.log(patientsData);
    // }

    return (
        <>
            <NavBar></NavBar>
            <Box component={Paper} elevation={5}
                sx={{
                    width: '300px', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column'
                }} >
                  {/* <Button onClick={verpatients}>Ver log</Button> */}
                <form onSubmit={handleSubmit}>
                    <FormControl required>
                        <Typography variant='h6' align='center'>Crear nuevo usuario</Typography>
                        <TextField
                            id="name"
                            label="Nombre"
                            color="secondary"
                            value={form.name}
                            name="name"
                            onChange={(event) => handleFormChange(event)}
                            helperText={error.name ? <Typography color="error">{error.name}</Typography>:''}
                            required
                        />


                        <TextField
                            id="apellido"
                            label="Apelido"
                            color='secondary'
                            value={form.surname}
                            name='surname'
                            onChange={(event) => handleFormChange(event)}
                            helperText={error.surname ? <Typography color="error">{error.surname}</Typography> : ''}
                            required
                        />
                        <TextField
                            id='email'
                            label='Email'
                            color='secondary'
                            value={form.email}
                            name='email'
                            onChange={(event) => handleFormChange(event)}
                            helperText={error.email ? <Typography color="error">{error.email}</Typography> : (error.vacio ? <Typography>{error.vacio}</Typography> : '')}
                            required />

                        <TextField
                            id='phone'
                            label='Telefono'
                            color='secondary'
                            value={form.phone}
                            name='phone'
                            onChange={(event) => handleFormChange(event)}
                            helperText={error.phone ? <Typography color="error">{error.phone}</Typography> : ''}
                            required />
                        {/* <DatePicker
                    label="Fecha de nacimiento"
                    value={birthdate}
                    onChange={handleBirthdateChange}
                    format="dd/MM/yyyy"
                    required
                /> */}

                        <InputLabel id="insurance-label"
                            color='secondary'>Obra social</InputLabel>
                        <Select style={{ width: '200px' }}
                            labelId="insurance-label"
                            id="insurance"
                            color='secondary'
                            value={form.insurance}
                            name='insurance'
                            onChange={(event) => handleFormChange(event)}
                            
                        >
                            <MenuItem value={'OSDE'}>OSDE</MenuItem>
                            <MenuItem value={'Swiss Medical'}>Swiss Medical</MenuItem>
                            <MenuItem value={'Galeno'}>Galeno</MenuItem>
                            <MenuItem value={'Otra'}>Otra</MenuItem>
                        </Select>

                        <TextField
                            id="document-number"
                            label="Número de documento"
                            type="number"
                            color='secondary'
                            value={form.dni}
                            name='dni'
                            onChange={(event) => handleFormChange(event)}
                            helperText={error.dni ? <Typography color="error">{error.dni}</Typography> : ''}
                            required
                        />

                        <TextField
                            id='password'
                            type={showPassword ? 'text' : 'password'}
                            label='Password'
                            color='secondary'
                            value={form.password}
                            name='password'
                            onChange={(event) => handleFormChange(event)}
                            helperText={error.password ? <Typography color="error">{error.password}</Typography> : ''}
                            required />

                        <TextField
                            id='confirmPassword'
                            type={showPassword ? 'text' : 'password'}
                            label='Confirmar password'
                            color='secondary'
                            value={form.confirmPassword}
                            name='confirmPassword'
                            onChange={(event) => handleFormChange(event)}
                            helperText={error.confirmPassword ? <Typography color="error">{error.confirmPassword}</Typography> : ''}
                            required />


                        <Typography>Mostrar contrasenas
                            <Checkbox
                                checked={showPassword}
                                onChange={handleShowPassword}
                                color="primary"
                                label="Show Password"
                            /></Typography>

                        <br />
                        <br />
                        <Button
                            sx={{ marginBottom: '20px' }}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Crear usuario
                        </Button>
                    </FormControl>
                </form>
            </Box>
        </>


    );
};

export default CreatePatient;
