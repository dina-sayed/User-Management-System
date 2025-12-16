import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext.tsx';
import styles from './Login.module.css';

export default function Login() {
  const { saveLoginData } = useContext(AuthContext); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

const onSubmit = async (data: any) => {
  try {
    const response = await axios.post(
      "https://dummyjson.com/auth/login",
      JSON.stringify(data),
      { headers: { "Content-Type": "application/json" } }
    );

    localStorage.setItem("token", response.data.token || response.data.accessToken);

    saveLoginData();

    toast.success("Logged in successfully!", { autoClose: 2500 });

    navigate("/home/users-list");
  } catch (error) {
    console.log(error);
    toast.error("Invalid username or password.", { autoClose: 2500 });
  }
};



  return (
    <div className={`${styles.auth_container} auth_container vh-100`}>
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col-md-5 bg-white p-5 rounded-3 shadow-md">
          <div className={`${styles.login} text-center mb-3 fs-3 py-2 px-4`}>
            <h1 className='h2'>User Management System</h1>
            <div className='text-center my-3'>
              <h4>Sign In</h4>
              <p>Enter your credentials to access your account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label>User Name</label>
              <input
                type="text"
                className={`${styles.form_control} form-control my-1`}
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 6, message: "Username must be at least 6 characters" }
                })}
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-danger">{errors.username?.message}</p>}
            </div>

            <div className="mb-5 position-relative">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className={`${styles.form_control} form-control my-1`}
                style={{ paddingRight: '2.5rem' }}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 10, message: "Password must be at least 10 characters" }
                })}
                placeholder="Enter your password"
              />
              <span
                style={{
                  position: 'absolute',
                  top: '65%',
                  right: '0.75rem',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </span>
              {errors.password && <p className="text-danger">{errors.password?.message}</p>}
            </div>

            <div className="d-grid gap-2">
              <button className={`${styles.btn_sigIn} btn text-white py-3`}>SIGN IN</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
