import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';

export default function Login({initLogin}){
  const {register, handleSubmit, formState: { errors } }= useForm();


  const onSubmit = (data) => {
    const {username, password} = data;
    initLogin(username,password);
  }
  return (
    <div className="auth-wrapper">
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

        <button type="submit" className="btn btn-primary mt-2">Log In</button>
        <p className="no-account text-right">No account yet? <Link to="/register" className="text-primary">Click Here</Link> to sign up</p>
      </form>
      </div>
      </div>
  
    )
  }


