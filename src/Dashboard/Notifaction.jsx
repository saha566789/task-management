import { useContext } from "react";
import { AuthContext } from "../Hooks/AuthProvider";
import useAxiosPublic from "../Hooks2/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";



const Notifaction = () => {
    const { user } = useContext(AuthContext); // Ensure you have access to the user context
    const axiosPublic = useAxiosPublic();
  
    const { data: tasks = [],  } = useQuery({
      queryKey: ["task"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/addTask/${user?.email}`);
        return res.data;
      },
    });
    return (
        <div className="mx-10">
        {tasks?.map((task) => (
          <div className="bg-[#cbd5e1] rounded pl-3" key={task._id}>
            <h1 className="mt-5 pt-3">Task: {task.title}</h1>
            <p>
              Deadline: <span>{moment(task.deadline).format("ll")}</span>
            </p>
            <p>
              Added: <span>{moment(task.addTime).fromNow()}</span>
            </p>
            <p className="pb-3">
              Update:{" "}
              <span>
                {task.update ? moment(task.update).fromNow() : "Not Updated Yet"}
              </span>
            </p>
          </div>
        ))}
      </div>
    );
};

export default Notifaction;