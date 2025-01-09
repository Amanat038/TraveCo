import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, loginSuccess,loginError } from "./redux/userReducer";

const LoginSignup = () => {
   
   const dispatch = useDispatch();
   
   useEffect(() => {
      dispatch(logout());
      localStorage.removeItem("userInfo");
   }, [dispatch]);
   
   const [isLogin, setIsLogin] = useState(true);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      role: "",
   });

   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (isLogin) {
         try {
            const response = await axios.post("http://localhost:4600/login", {
               email: formData.email,
               password: formData.password,
            });

            const { token, user } = response.data;

            localStorage.setItem("authToken", token);
            localStorage.setItem("userInfo", JSON.stringify(user));
            
            alert("login successful");
            navigate("/");
         } catch (error) {
            alert("invalid email or password", error);
         }
      } else {
         try {
            await axios.post("http://localhost:4600/register", {
               name: formData.name,
               email: formData.email,
               password: formData.password,
               role: formData.role,
            });
            console.log(formData.role);

            alert("signup successful ");
            setIsLogin(true);
         } catch (error) {
            alert("error during signUp", error);
         }
      }
   };

   return (
      <div
         className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-cover"
         style={{
            backgroundImage:
               "url('https://i.pinimg.com/originals/0f/c7/54/0fc75485d7ea414bf2b8934f2db9fa1a.jpg')",
         }}
      >
         <h1 className="text-6xl font-extrabold text-left text-teal-500">
            TraveCo.
         </h1>
         <form
            onSubmit={handleSubmit}
            className="w-full max-w-md px-8 pt-6 pb-8 bg-black rounded shadow-md"
         >
            <h1 className="mb-6 text-4xl font-bold text-center text-white">
               {isLogin ? "Login" : "Signup"}
            </h1>
            {!isLogin && (
               <div className="mb-4">
                  <label
                     className="block mb-2 text-sm font-bold text-white"
                     htmlFor="name"
                  >
                     Name
                  </label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     required={!isLogin}
                     className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  />
               </div>
            )}

            <div className="mb-4">
               <label
                  className="block mb-2 text-sm font-bold text-white"
                  htmlFor="email"
               >
                  Email
               </label>
               <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
               />
            </div>

            <div className="mb-4">
               <label
                  className="block mb-2 text-sm font-bold text-white"
                  htmlFor="password"
               >
                  Password
               </label>
               <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
               />
            </div>
            {!isLogin && (
               <div className="mb-4">
                  <label
                     className="block mb-2 text-sm font-bold text-white"
                     htmlFor="password"
                  >
                     Role
                  </label>
                  <select
                     id="role"
                     name="role"
                     value={formData.role}
                     onChange={handleChange}
                     required
                     className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  >
                     <option value="" disabled>
                        Select Role
                     </option>
                     <option value="admin">Admin</option>
                     <option value="user">User</option>
                  </select>
               </div>
            )}

            <button
               type="submit"
               className="w-full px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-800 focus:outline-none focus:shadow-outline"
            >
               {isLogin ? "Login" : "Signup"}
            </button>

            <div className="mt-4 text-center">
               <p
                  className="text-blue-500 cursor-pointer "
                  onClick={() => setIsLogin(!isLogin)}
               >
                  {isLogin
                     ? "Don't have an account? Sign up"
                     : "Already have an account? Login"}
               </p>
            </div>
         </form>
      </div>
   );
};

export default LoginSignup;
