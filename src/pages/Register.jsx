import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import {useRegister, useSession} from "../contexts/AuthProvider"


export default function Register(){
const history = useHistory();
const {register, handleSubmit, formState: { errors}, clearErrors, getValues}= useForm();
const {error} = useSession();
const [bError, setbError] = useState("");

const registerMethod = useRegister();

  const handleRegister = useCallback(async ({email,username, firstname, lastname, password}) => {
    setbError(null); 
    clearErrors();
    const data = await registerMethod({email,username, firstname, lastname, password});
      if(data){
        history.replace("/home");
      }else{
        setbError(error);
      }
    }, [history, registerMethod, clearErrors, error]);

    const handleErrors = (e) => {
      if(error){
        if(e.target["name"] === "email" && (error.status === 420 || error.status === 422)){
          setbError(null);
        }if(e.target["name"] === "username" && (error.status === 421 || error.status === 422)){
          setbError(null);
        }
      }
    }


return (
  <div className="auth-wrapper">
      <a className="login-quiz-master title" href="/">Quiz-Master</a>
    <div className="auth-inner">
    <form className="register-form" onSubmit={handleSubmit(handleRegister)}>
      <h3>Register</h3>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text" name="email" id="email"
          {...register('email',{  required:"Please fill in a email.", pattern:{value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message:"Please enter a valid email."}})}
          className="form-control"
          onKeyDown={handleErrors}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        {error && error.data.message.toLowerCase().includes("email") && <p className="text-red-500">Email already in use</p>}
      </div>

      <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text" name="username" id="username"
            {...register('username',{ 
              required:{
                value: true,
                message: "Please fill in your username." 
              },
              maxLength:{
                value:20,
                message: "Please use a smaller name"
              }
            })}
            className="form-control"
            onKeyDown={handleErrors}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
          { error && error.data.message.toLowerCase().includes("username") && <p className="text-red-500">Username already in use.</p> }
        </div>


      <div className="form-group">
        <label htmlFor="firstname">First Name</label>
        <input
          type="text" name="firstname" id="firstname"
          {...register('firstname', {required:"Please fill in your first name.", pattern:{value:"/s", message:"Please input non-digits as a name"}})}                
          className="form-control"
          defaultValue=""
        />
        {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}

      </div>

      <div className="form-group">
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text" name="lastname" id="lastname"
          {...register('lastname', {required:"Please fill in your last name.", pattern:{ value:"/s" , message:"Please input non-digits as a name"}})}
          className="form-control"
          defaultValue=""
        />
        {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}

      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password" name="password" id="password"
          {...register('password', {required:"Please fill in your password.", minLength:{ value:8 , message:"Password strength is too weak. Use a minimum length of 8"}})}
          className="form-control"
          defaultValue=""
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      </div>


      <div className="form-group">
        <label htmlFor="confirmation">Password Confirmation</label>
        <input
          type="password" name="confirmation" id="confirmation"
          {...register('confirmation', {required:"Please fill in the confirmation password.",  validate:{
            notIdentical: value => {
              const password =  getValues("password");
              return password === value? null: "both passwords need to be the same";
            }
          } } ) }
        
          className="form-control"
          defaultValue=""
        />
        {errors.confirmation && <p className="text-red-500">{errors.confirmation.message}</p>}

      </div>

      <button type="submit" className="btn btn-primary mt-2">Register</button>
      <p className="has-account text-right">Already have an account?<br/> <Link to="/login" className="text-primary">Click Here</Link> to log in.</p>
    </form>
    </div>
    </div>

  )
        }
      
