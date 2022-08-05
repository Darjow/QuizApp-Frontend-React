import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useCallback} from 'react';
import { useLogin, useSession} from '../contexts/AuthProvider';
import { useState } from 'react';




export default function Login(){
  const methods = useForm();
  const {handleSubmit, clearErrors, formState:{errors}, register} = methods;
  const history = useHistory();
  const [bError, setbError] = useState("");
  const {error} = useSession();




  const login = useLogin();

  
    const handleLogin = useCallback(async ({username, password}) => {
      setbError(null); 
      clearErrors();
      const check = await login(username, password);
      if(check){
        history.push("/home");
      }else{
        setbError("wrong credentials")
      }

  },[clearErrors,login, history]);


  const handleChange = (e) => {
    if(bError){
      if(e.target["name"] === "Username" || e.target["name"] === "Password" ){
        setbError(null);
      }  
    }
  }
    return (
      <div className="auth-wrapper">
        <a className="login-quiz-master title" href="/">Quiz-Master</a>
        <div className="auth-inner">
        <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
          <h3>Sign In</h3>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
            data-cy="username-input"
              type="text" name="username" id="username"
              {...register('username',{ 
                required:{
                  value:true,
                  message:"Please fill in your username."
                },
                maxLength:{
                  value:20, 
                  message:"Invalid username."
                  }})}
              className="form-control"
              onSubmit={handleSubmit(handleLogin)}
              onKeyDown={handleChange}
            /> 
            {errors.username && <p className="text-red-500">{errors.username.message}</p>}
            {!errors.username  && bError && error.data.message.includes("Username") && <p className='text-red-500'>{error.data.message}</p>}

          </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
            data-cy="password-input"
              type="password" name="password" id="password"
              {...register('password', {
                required:{
                  value:true,
                  message:"Please fill in a password."
                },
                minLength:{
                  value:8,
                  message:"Password must be minimum 8 characters long."
                }
                })}
              className="form-control"
              onSubmit={handleSubmit(handleLogin)}
              onKeyDown={handleChange}
            />

            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            {!errors.password && bError && error.data.message.includes("Password") && <p className='text-red-500'>{error.data.message}</p>}
            
        
          </div>
          <button data-cy="submit-login" type="submit" className="mt-2 btn-login btn btn-primary">Login</button>
          <p className="no-account text-right">No account yet?<br/> <Link to="/register" className="text-primary">Click Here</Link> to sign up</p>
        </form>
        </div>
        </div>
    
      )
              }
        