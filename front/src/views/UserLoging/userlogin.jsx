import React, { useState } from "react";
import "./userlogin.css";
import {Link} from "react-router-dom";

const Userlogin = () => {

    //estado para inputs
    const [input, setInput] = useState({
        mail:'',
        password:''
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
        password: ''
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
    }

    function handleLogin() {
        console.log('click en btn login');
    }

    return (
        <div className="">
            <div className="login_container">
            <div className="login_image">
                <h1 className="login_title">CONSUMEDIC</h1>
            </div>
            
            <form className="login">
                <h2>LOG IN</h2>
                <input className="login_input" type="email" name="mail" value={input.mail} placeholder="Enter your mail" onChange={(event) => inputHandleChange(event)}>
                </input>
                {error.mail && <span className="error_input">{error.mail}</span>}


                <input className="login_input" type="password" name="password" placeholder="Password" onChange={(event) => inputHandleChange(event)} />
                {error.password && <span className="error_input">{error.password}</span>}
                <button type="submit" className='login_btn' onClick={handleLogin}>LOGIN</button>
                <p>You do not have an account? <a href="/register">Register me</a></p>
            </form>
        </div>
        </div>
        
    )
}

export default Userlogin;