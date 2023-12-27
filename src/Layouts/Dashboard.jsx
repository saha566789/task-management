import { NavLink, Outlet } from "react-router-dom";
import Footer from "../Pages/Home/Footer";


const Dashboard = () => {
    return (
        <div>
               <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-rose-300">
          <ul className="menu p-4">
           

             
              <li>
                <NavLink to="/dashboard">
                 
                  Add Task</NavLink>
              </li>
             <br />
              <li>
                <NavLink to="/dashboard/task">
                 
                 Task List</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/notification">
                Notification
                 </NavLink>
              </li>



             

           
            {/* shared nav links */}
            <div className="divider"></div>
            <li>
              <NavLink to="/">
               
                Home</NavLink>
            </li>
           
          </ul>
        </div>

        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>

      </div>
      <div className="mt-0">
        <Footer></Footer>
      </div>
    </div>
       
    );
};

export default Dashboard;