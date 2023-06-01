import { Box, TextField } from '@mui/material';

const Incomplete = ({ fields }) => {
  const [localEmail, setLocalEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState('');

  const [localPassword, setLocalPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelperText, setPasswordHelperText] = useState('');


  const [patientData, setPatientData] = useState({
    
  });
  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleEmailChange = (event) => {
    setLocalEmail(event.target.value);
    if (event.target.value === '') {
      setEmailError(true);
      setEmailHelperText('El correo electrónico es requerido.');
    } else if (!emailRegex.test(event.target.value)) {
      setEmailError(true);
      setEmailHelperText('El correo electrónico no es válido.');
    } else {
      setEmailError(false);
      setEmailHelperText('');
    }
  };

  const handlePasswordChange = (event) => {
    setLocalPassword(event.target.value);
    if (event.target.value === '') {
      setPasswordError(true);
      setPasswordHelperText('ingrese su contrasena.');
    } else {
      setPasswordError(false);
      setPasswordHelperText('');
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    loginPatient({ email: localEmail, password: localPassword, isDoctor: false })
      .then((res) => {
        console.log(res);
        setSnackOk(true);
        setSnackOkMensaje('Logueado con exito');
        navigate('/perfilMedico');
      })
      .catch((err) => {
        setSnackFail(true);
        setSnackFailMensaje(err.response.data.message);
      });
  }

  return (
    <Box>
      {fields.map((field) => (
        <TextField
          id={field.id}
          defaultValue={field.defaultValue}
          value={field.value}
          label={field.label}
          placeholder={field.placeholder}
          variant="outlined"
          helperText={emailError ? <p>{emailHelperText}</p> : ''}
        />
      ))}

      <TextField
        required
        id="fieldset"
        defaultValue="Email"
        color="secondary"
        type="email"
        name="mail"
        value={localEmail}
        placeholder="Enter your mail"
        onChange={(event) => handleEmailChange(event)}
        helperText={emailError ? <p>{emailHelperText}</p> : ''}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: emailError ? 'red' : 'secondary',
            },
            '&:hover fieldset': {
              borderColor: emailError ? 'red' : 'secondary',
            },
            '&.Mui-focused fieldset': {
              borderColor: emailError ? 'red' : 'secondary',
              borderWidth: '2px',
            },
          },
          '& .MuiFormHelperText-root': {
            color: emailError ? 'red' : 'secondary',
          },
          height: '80px',
          width: '100%',
        }}
      />
    </Box>
  );
};

export default Incomplete;
