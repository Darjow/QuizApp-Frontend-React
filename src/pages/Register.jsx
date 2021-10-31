import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";




export default function Register({initRegister}){
  
const {register, handleSubmit, formState: { errors } ,setError, clearErrors}= useForm();
const onSubmit = (data) => {
  const {email,username, password,confirmation, firstname, lastname } = data;
  console.log("hi");
  if(password === confirmation){
    clearErrors("confirmation");
    initRegister(email,username,password, firstname, lastname);
  }else{
    setError("confirmation", {type: "validate", message:"The password combinations are not the same."});
  }
}
return (
  <div className="auth-wrapper">
      <Link className="home-redirect" to="/">Quiz-Master</Link>
    <div className="auth-inner">
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Register</h3>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text" name="email" id="email"
          {...register('email',{ required:"Please fill in a email.", pattern:{value:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message:"Please enter a valid email."}})}
          defaultValue=""
          className="form-control"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

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
          {...register('confirmation', {required:"Please fill in the confirmation password.", minLength:8} )}
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