import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Hooks/AuthProvider";


const Navbar = () => {
    const {user,logout} = useContext(AuthContext)
    const handleLogOut = () =>{
        logout().then()
      }
    
    const navLink = <>
     <li><Link to="/">Home</Link></li>
     <li><Link to="/about">About Us</Link></li>
     <li><Link to="/faq">FAQ</Link></li>
    </>
    return (
        <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
             {navLink}
            </ul>
          </div>
          <a className="text-xl">TaskHarbor</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {navLink}
          </ul>
        </div>
        {user?.email ?
     <>
      <div className="navbar-end">

      <div className="dropdown dropdown-end">
            <div className="flex items-center flex-wrap" >
            <p className="lg:text-xl text-red-700 text-xs">{user.displayName}</p>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full flex">
                <img src={user.photoURL} alt={user.displayName} />
                
              </div>
             
            </label>
            
         <button onClick={handleLogOut} className="text-red-700 flex font-semibold text-xl">Logout</button>
            </div>
          
           
            </div>
      </div>
  
            </>
            :
            <div className="navbar-end">
        <Link to="/login"> <a className="btn bg-blue-400">Login</a></Link>
        </div>
        
          }


        
      </div>
    );
};

export default Navbar;