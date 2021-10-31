import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import { Button } from '../components/component/Button';
import { useCallback } from 'react';



export default function Login(){
  const {register, handleSubmit,formState: { errors } }= useForm(); 


  const onSubmit = useCallback(async(data) => {
      try{
        await axios.post("http://localhost:9000/api/user/login",{
        username: data.username,
        password: data.password
        }).then((response) => {
          console.log(response);
          if(response.data.length === 1){
            localStorage.setItem("User", data.username);
          }else{
            
          }
        });
    }catch(err){
      console.log("Error in Login catched: ",err);
    }
  }, []);


      
  


  return (
    <div className="auth-wrapper">
      <Link className="home-redirect" to="/">Quiz-Master</Link>
      <div className="auth-inner">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
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

        </div>
        <Button type="submit"  buttonStyle="btn btn-primary mt-2" className="btn-login" text="Log in" onClick={handleSubmit(onSubmit)}/>
        <p className="no-account text-right">No account yet?<br/> <Link to="/register" className="text-primary">Click Here</Link> to sign up</p>
      </form>
      </div>
      </div>
  
    )
  }



