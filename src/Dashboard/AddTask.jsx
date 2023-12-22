import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const AddTask = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
       
        
            const newProduct = {
                title: data.title,
                description: data.description,
                deadline:data.deadline,
                priority:data.priority
                
            }
           
            fetch('http://localhost:5000/addTask',{
                        method:'POST',
                        headers:{
                         'content-type': 'application/json'
                        },
                        body:JSON.stringify(newProduct)
                     })
            
            if(data.insertedId){
               
                // show success popup
                reset();
                
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        
    }
     
      
        


    // }
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