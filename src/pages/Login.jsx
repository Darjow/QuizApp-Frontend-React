import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useCallback, useEffect } from 'react';
import { useLogin, useSession } from '../contexts/AuthProvider';
import {useHistory} from "react-router-dom";


export default function Login(){
  const {register, handleSubmit,formState: { errors } , clearErrors}= useForm(); 
  const login = useLogin();
  const history = useHistory();
  const {isAuthed ,error} = useSession();
  
    
  useEffect(() => {
    if(isAuthed){
      history.replace("/home");
    }
  }, [isAuthed, history])



  const handleLogin = useCallback(async ({username, password}) => {
    clearErrors();
    const success = await login(username, password);
    if(success){
      history.replace("/home");
    }

  },[clearErrors,login, history]);



  return (
    <div className="auth-wrapper">
      <Link className="home-redirect" to="/">Quiz-Master</Link>
      <div className="auth-inner">
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <h3>Sign In</h3>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text" name="username" id="username"
            {...register('username',{ required:"Please fill in your username." })}
            defaultValue=""
            className="form-control"
          />
         
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
      <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password" name="password" id="password"
            {...register('password', {required:"Please fill in your password."} )}
            className="form-control"
            defaultValue=""
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          {
            error? (
              <p className='text-red-500'>{error}</p>
            ) : null
          }
        </div>
        <button type="submit" className="btn-login btn btn-primary mt-2">Login</button>
        <p className="no-account text-right">No account yet?<br/> <Link to="/register" className="text-primary">Click Here</Link> to sign up</p>
      </form>
      </div>
      </div>
  
    )
  }



