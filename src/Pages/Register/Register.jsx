import { useContext } from "react";
import { AuthContext } from "../../Hooks/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {
    const {createUser,googleSign,handleUpdateProfile} = useContext(AuthContext)
    const navigate = useNavigate()


    const handleGoogle =() =>{
        googleSign()
        .then(result =>{
            console.log(result.user)
        })
    }
    const handleRegister = e =>{
        e.preventDefault()
        console.log(e.currentTarget)
        const form = new FormData(e.currentTarget)
        const name = form.get('name')
        const photo = form.get('photo')
        const email = form.get('email')
        const password = form.get('password')
        console.log(name,photo,email,password)


       

        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!*_])[A-Za-z\d@#$%^&+=!*_]{6,}$/.test(password)){
          Swal.fire('Minimum six characters, at least capital letter and special character')
            return;
        }
        createUser(email,password)
        .then(result => {
            handleUpdateProfile(name, photo)
                .then(() => {
                  Swal.fire('Your account created successfully');
                    navigate('/dashboard')

                })
        })
        .catch(error => {
          Swal.fire(error.message)
        })

    }
    return (
        <div>
            
        <div className="hero min-h-screen bg-base-200">
<div className="hero-content flex-col ">
<div className="text-center ">
  <h1 className="text-lg lg:text-4xl font-bold">Register Your Account.</h1>
  
</div>
<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
  <form onSubmit={handleRegister} className="card-body">
    <div className="form-control">
      <label className="label">
        <span className="label-text">Name</span>
      </label>
      <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Photo</span>
      </label>
      <input type="text" name="photo" placeholder="Photo Url" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Email</span>
      </label>
      <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text">Password</span>
      </label>
      <input type="password" name="password" placeholder="Password" className="input input-bordered" required />
      
    </div>
    <div className="form-control mt-6">
      <button className="btn btn-primary">Register</button>
      <h2 className="text-center text-gray-400">Or</h2>
      <button onClick={handleGoogle} className="btn btn-primary">Sign in Google</button>
    </div>
    <p className="text-center ">Already have a account. <Link className="text-red-600 underline" to="/login">Login</Link></p>
  </form>

</div>
</div>
</div>
    </div>
    );
};

export default Register;