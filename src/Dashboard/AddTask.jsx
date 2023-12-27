import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../Hooks/AuthProvider";
import useAxiosPublic from "../Hooks2/useAxiosPublic";


const AddTask = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
   
    const onSubmit = async (data) => {
        console.log(data)
       
        
            const newProduct = {
                email: user?.email,
                title: data.title,
                description: data.description,
                deadline:data.deadline,
                priority:data.priority,
                status: "todo"
                
            }
          
            axiosPublic.post("/addTask", newProduct).then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "task added",
                                showConfirmButton: false,
                                timer: 1500
                              });
                  reset();
                }
              });
            };
    return (
        <div className="bg-[#F4F3F0] lg:p-24">
            <h2 className="lg:text-3xl text-xl font-extrabold">Add Task</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full my-6">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input
                    type="text"
                    placeholder="Title"
                    {...register('title', { required: true })}
                    required
                    className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full my-6">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <input
                    type="text"
                    placeholder="Description"
                    {...register('description', { required: true })}
                    required
                    className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full my-6">
                <label className="label">
                    <span className="label-text">Deadline</span>
                </label>
                <input
                    type="date"
                    placeholder="deadline"
                    {...register('deadline', { required: true })}
                    required
                    className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full my-6">
                <label className="label">
                    <span className="label-text"> Priority</span>
                </label>
                <select {...register("priority")} className="input input-bordered w-full">
        <option value="Low">Low</option>
        <option value="moderate">moderate</option>
        <option value="high">high</option>
      </select>
            </div>
            <button  className="btn bg-red-300">
                Add Product
            </button>
        </form>
        </div>
     
    );
};

export default AddTask;