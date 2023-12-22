import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthProvider";


const Banner = () => {
    
    const {user} = useContext(AuthContext)
   
    return (
        <div className="hero min-h-screen" style={{backgroundImage: 'url(https://i.ibb.co/TL1ym4j/taskbanner.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="">
      <h1 className="mb-5 text-5xl font-bold">Welcome Task Management Website</h1>
      <p className="mb-5">
Task management is the process of effectively and efficiently tracking, managing, and executing the life cycle of a task or many tasks within a project, from inception to execution. </p>
{
            user?.email?  <Link to="/dashboard"> <button  className="btn btn-primary">Lets Explore</button></Link>: <Link to="/login"> <button  className="btn btn-primary">Lets Explore</button></Link> 
        }
    
    </div>
  </div>
</div>
    );
};

export default Banner;