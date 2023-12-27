import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../src/Hooks/AuthProvider";
import useAxiosPublic from "../../src/Hooks2/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import moment from "moment";


const TaskList = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [todo, setTodo] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [mounted, setMounted] = useState(true); // Add mounted state

  const { data: task = [], refetch } = useQuery({
    queryKey: ["task"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/addTask/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (task) {
      const newTodo = task.filter((item) => item.status === "todo");
      const newProgress = task.filter((item) => item.status === "progress");
      const newCompleted = task.filter((item) => item.status === "completed");
  
      if (JSON.stringify(todo) !== JSON.stringify(newTodo)) {
        setTodo(newTodo);
      }
      if (JSON.stringify(progress) !== JSON.stringify(newProgress)) {
        setProgress(newProgress);
      }
      if (JSON.stringify(completed) !== JSON.stringify(newCompleted)) {
        setCompleted(newCompleted);
      }
    }
  }, [todo,progress,completed,task]); // Ensure task is correctly memoized or stable
  
  const [openDropdownMap, setOpenDropdownMap] = useState({});

  const toggleDropdown = (taskId) => {
    setOpenDropdownMap((prevMap) => ({
      ...prevMap,
      [taskId]: !prevMap[taskId],
    }));
  };

  const handelDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/addTask/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            // Check if the component is still mounted before calling refetch
            if (mounted) {
              refetch();
            }
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }


    const updatedTasks = Array.from(task);

  
    const [movedTask] = updatedTasks.splice(source.index, 1);


    updatedTasks.splice(destination.index, 0, movedTask);

    console.log(draggableId);
    axiosPublic
      .patch(`/addTask?id=${draggableId}`, {
        status: destination.droppableId,
      })
      .then(() => {
        refetch();
      });
  };

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);
  return (
    <div>
        <div className="px-5">
      <div className="flex justify-center items-center content-center mt-5">
      
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-10">
        <DragDropContext onDragEnd={onDragEnd}>
          <div>
            <Droppable droppableId="todo">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-[#EEF2F5] px-4"
                >
                  <div className="h-fit pb-4">
                    <h1 className="text-center my-3 pt-4 mb-3">To Do</h1>
                    {todo?.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={task._id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full justify-center mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow my-5"
                          >
                            <div className="px-4 pt-4">
                              <div className="relative">
                                <div className="flex justify-between items-center">
                                  <h1>{task.priority}</h1>
                                  <button
                                    id={`dropdownButton-${task._id}`}
                                    onClick={() => toggleDropdown(task._id)}
                                    className="inline-block text-gray-500  hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                                    type="button"
                                  >
                                    <span className="sr-only">
                                      Open dropdown
                                    </span>
                                    <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 16 3"
                                    >
                                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                  </button>
                                </div>

                                <div
                                  id={`dropdown-${task._id}`}
                                  className={`absolute right-0 z-50 ${
                                    openDropdownMap[task._id] ? "" : "hidden"
                                  } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                                >
                                  <ul
                                    className="py-2"
                                    aria-labelledby={`dropdownButton-${task._id}`}
                                  >
                                    <li>
                                      <Link
                                        to={`/dashboard/updateTask/${task._id}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                      >
                                        Update
                                      </Link>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={() => handelDelete(task._id)}
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="p-4">
                              <h1 className="text-2xl truncate">
                                {task.title}
                              </h1>
                              <p className="mt-2 truncate">
                                {task.description}
                              </p>
                              <div className="flex items-center justify-between mt-4">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                </span>
                                <span>
                                  {moment(task.Deadline).format("ll")}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <Droppable droppableId="progress">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-[#EEF2F5] px-4"
                >
                  <div className="h-fit pb-4">
                    <h1 className="text-center mt-3 pt-4 mb-3">Ongoing</h1>
                    {progress?.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={task._id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full justify-center mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5"
                          >
                            <div className="px-4 pt-4">
                              <div className="relative">
                                <div className="flex justify-between items-center">
                                  <h1>{task.priority}</h1>
                                  <button
                                    id={`dropdownButton-${task._id}`}
                                    onClick={() => toggleDropdown(task._id)}
                                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                                    type="button"
                                  >
                                    <span className="sr-only">
                                      Open dropdown
                                    </span>
                                    <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 16 3"
                                    >
                                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                  </button>
                                </div>
                                {/* Dropdown menu */}
                                <div
                                  id={`dropdown-${task._id}`}
                                  className={`absolute right-0 z-50 ${
                                    openDropdownMap[task._id] ? "" : "hidden"
                                  } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                                >
                                  <ul
                                    className="py-2"
                                    aria-labelledby={`dropdownButton-${task._id}`}
                                  >
                                    <li>
                                      <Link
                                        to={`/dashboard/updateTask/${task._id}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                      >
                                        Update
                                      </Link>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={() => handelDelete(task._id)}
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="p-4">
                              <h1 className="text-2xl truncate">
                                {task.title}
                              </h1>
                              <p className="mt-2 truncate">
                                {task.description}
                              </p>
                              <div className="flex items-center justify-between mt-4">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                </span>
                                <span>
                                  {moment(task.Deadline).format("ll")}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>

          <div>
            <Droppable droppableId="completed">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-[#EEF2F5] px-4"
                >
                  <div className="h-fit pb-4">
                    <h1 className="text-center mt-3 pt-4 mb-3">Complete</h1>
                    {completed?.map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            key={task._id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full justify-center mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5"
                          >
                            <div className="px-4 pt-4">
                              <div className="relative">
                                <div className="flex justify-between items-center">
                                  <h1>{task.priority}</h1>
                                  <button
                                    id={`dropdownButton-${task._id}`}
                                    onClick={() => toggleDropdown(task._id)}
                                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                                    type="button"
                                  >
                                    <span className="sr-only">
                                      Open dropdown
                                    </span>
                                    <svg
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 16 3"
                                    >
                                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                    </svg>
                                  </button>
                                </div>
                                {/* Dropdown menu */}
                                <div
                                  id={`dropdown-${task._id}`}
                                  className={`absolute right-0 z-50 ${
                                    openDropdownMap[task._id] ? "" : "hidden"
                                  } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                                >
                                  <ul
                                    className="py-2"
                                    aria-labelledby={`dropdownButton-${task._id}`}
                                  >
                                    <li>
                                      <Link
                                        to={`/dashboard/updateTask/${task._id}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                      >
                                        Update
                                      </Link>
                                    </li>
                                    <li>
                                      <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                        onClick={() => handelDelete(task._id)}
                                      >
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="p-4">
                              <h1 className="text-2xl truncate">
                                {task.title}
                              </h1>
                              <p className="mt-2 truncate">
                                {task.description}
                              </p>
                              <div className="flex items-center justify-between mt-4">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                  </svg>
                                </span>
                                <span>
                                  {moment(task.Deadline).format("ll")}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
    </div>
  );
};

export default TaskList;