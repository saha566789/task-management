import { useContext } from "react";
import { AuthContext } from "../Hooks/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../Hooks2/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const UpdateTask = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
  
    const { data: task = [], refetch } = useQuery({
      queryKey: ["task"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/addTask/${user?.email}`);
        // console.log(res.data);
        return res.data;
      },
    });
  
    const { id } = useParams();
  
    const taskData = task?.find((item) => item._id === id);
  
    const onSubmit = async (data) => {
      const taskInfo = {
        email: user?.email,
        priority: data.priority,
        title: data.title,
        description: data.description,
        deadline: data.deadline,
        status: "todo",
        update: new Date()
      };
  
      console.log(taskInfo);
  
      axiosPublic.put(`/addTask/${id}`, taskInfo).then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          
            toast.success("Your Task Updated Successfully")
         refetch()
         reset()
        }
      });
    };
    return (
        <div>
        <div className="bg-white px-6 py-24 sm:py-14 lg:px-8">
          <div
            className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            aria-hidden="true"
          >
            <div
              className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Update Your Task
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Record your daily tasks effortlessly
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Task Title
                </label>
                <div className="mt-2.5">
                  <input
                    defaultValue={taskData?.title}
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                    name="title"
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Task Deadline
                </label>
                <div className="mt-2.5">
                  <input
                    defaultValue={taskData?.deadline}
                    type="date"
                    placeholder="Deadline"
                    {...register("deadline", { required: true })}
                    name="deadline"
                    id="date"
                    autoComplete="date"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div className="sm:col-span-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Task Priority
                </label>
                <div className="mt-2.5">
                  <select
                    defaultValue={taskData?.priority}
                    {...register("priority", { required: true })}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option disabled value="default">
                      Select a priority
                    </option>
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
  
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Task Description
                </label>
                <div className="mt-2.5">
                  <textarea
                    placeholder="Description"
                    {...register("description", { required: true })}
                    name="Description"
                    id="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={taskData?.description}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
  
        <Toaster position="top-center" reverseOrder={true}></Toaster>
      </div>
    );
         
}

export default UpdateTask;