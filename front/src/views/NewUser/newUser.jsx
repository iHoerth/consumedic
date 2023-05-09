import React, { useState } from "react";
import "./newuser.css";

const NewUser = () => {

    //estado para inputs
    const [input, setInput] = useState({
        mail:'',
        password:'',
        checkpassword:''
    });

    //funcion para cambiar el estado del input
    function inputHandleChange(event) {
        
        validation({...input, [event.target.name]: event.target.value})
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }
    //estado para errores
    const [error, setError] = useState({
        mail: '',
        password: '',
        checkpassword:''
    });
    //expresion regular para mails
    const mailRegex = /^[_\w.%+]{1,64}@(?:[A_Z0_9_]{1,63}\.){1,125}[A_Z]{2,63}$/i;

    //fn para validar errores
    function validation(input) {
        //log para ver que seteo en mail
        console.log('email: '+input.mail);

        //log para ver la pass
        console.log('password: '+ input.password);
        // const newErrors = {...error};
        if (input.mail==='') {
            console.log('email vacio');
            setError({...error, mail:'Enter an email '})
        }
        if (mailRegex.test(input.mail)) {
            setError({...error, mail:''})
        }else{
            console.log('email invalido');
            setError({...error, mail:"Please enter a valid mail"})
        }

        if (input.password==='') {
            setError({...error, password:'Enter your password'})
        }
        if (input.checkpassword!==input.password) {
            setError({...error, checkpassword:'Passwords do not match'})
        }
    }

    function handleRegister() {
        console.log('click en btn register');
    }

    return (
        <div className="container_newUser">
            <h1>CONSUMEDIC</h1>

            <div className="container_create_google">
                <button><a href='https://www.google.com' >CONTINUE WIDTH GOOGLE</a></button>
                <button><a href='https://www.facebook.com' >CONTINUE WIDTH FACEBOOK</a></button>
            </div>

            <form className="container_form">
                <input className="form_input_register" type="email" name="mail" value={input.mail} placeholder="Enter your email" onChange={(event) => inputHandleChange(event)} />
                {error.mail && <span className="error_input">{error.mail}</span>}

                <input className="form_input_register" type="password" name="password" value={input.password} placeholder="Password" onChange={(event) => inputHandleChange(event)}/>
                {error.password && <span className="error_input">{error.password}</span>}

                <input className="form_input_register" type="password" name="checkPassword" value={input.checkpassword} placeholder="Check your password" onChange={(event) => inputHandleChange(event)}/>
                {error.checkpassword && <span className="error_input">{error.checkpassword}</span>}

                <label>Show passwords<input type="checkbox" name="checkbox"></input></label>
                <button type="submit" onClick={handleRegister}>Register me</button>
            </form>
        </div>
        
    )
}

export default NewUser;