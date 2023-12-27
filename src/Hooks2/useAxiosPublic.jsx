import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://task-management-server-brown-ten.vercel.app/",
  });
const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;