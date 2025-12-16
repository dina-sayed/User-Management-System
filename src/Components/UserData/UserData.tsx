import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import styles from "./UserData.module.css";

export default function UserData() {
  const { loginData } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.id || null;
  const mode = location.state?.mode;

  const isProfile = mode === "profile";
  const isUpdate = !!location.state?.id && !isProfile;
  const isAdd = !location.state?.id && !isProfile;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [userImage, setUserImage] = useState<string>("");

  // ================= Load Data =================
  useEffect(() => {
    if (isUpdate || isProfile) {
      axios
        .get(`https://dummyjson.com/users/${userId}`)
        .then((res) => {
          reset(res.data);
          setUserImage(res.data.image || "");
        })
        .catch(() => {
          toast.error("Failed to load user data");
        });
    }

    if (isAdd) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        phone: "",
        birthDate: "",
      });
      setUserImage("");
    }
  }, [isAdd, isUpdate, isProfile, userId, reset]);

  // ================= Submit =================
  const onSubmit = async (data: any) => {
    try {
      if (isAdd) {
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success("   successfully add new user");
      }

      if (isUpdate) {
        await axios.put(`https://dummyjson.com/users/${userId}`, data);
        toast.success(" User updated successfully");
      }

      setTimeout(() => {
        navigate("/home/users-list");
      }, 1500);
    } catch (error) {
      toast.error(" Something went wrong");
    }
  };

  return (
    <div className="user-data-container">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          {isProfile ? "Profile User" : isUpdate ? "Update User" : "Add User"}
        </h1>

        <div className={styles.container}>
          {isProfile && userImage && (
            <div className="text-center mb-4">
              <img
                src={userImage}
                alt="User"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  position: "absolute",
                  top: "75px",
                  transform: "translateX(-48%)",
                }}
              />
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input
                  disabled={isProfile}
                  {...register("firstName", 
                    { required: "please enter first name" ,
                    minLength: {
                      value: 3,
                      message: "First name must be at least 3 characters long",
                    }
                    ,
                    maxLength: {
                      value: 10,
                      message: "First name must be at most 10 characters long",
                    }
                  }
                  )}
                />
                {errors.firstName && (
                  <p className="text-danger">{`${errors.firstName.message}`}</p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input
                  disabled={isProfile}
                  {...register("lastName", { 
                    required: "please enter last name",
                    minLength: {
                      value: 3,
                      message: "Last name must be at least 3 characters long",
                    },
                    maxLength: {
                      value: 10,
                      message: "Last name must be at most 10 characters long",
                    
                    }
                  })}
                />
                {errors.lastName && (
                  <p className="text-danger">{`${errors.lastName.message}`}</p>
                )}
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Email</label>
                  <input
                  disabled={isProfile}
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-danger">{`${errors.email.message}`}</p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Age</label>
                <input
                  type="number"
                  disabled={isProfile}
                  {...register("age", {
                    required: "please enter age",
                    min: {
                      value:18 ,
                      message: "Age must be at least 18 years old",
                    },
                    max: {
                      value: 65,
                      message: "Age must be at most 65 years old",
                    },
                  })}
                />
                {errors.age && (
                  <p className="text-danger">{`${errors.age.message}`}</p>
                )}
              </div>
              
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Phone</label>
                  <input
                  type="tel"
                  readOnly={isProfile}
                  {...register("phone", {
                    required: "Please enter phone number",
                    pattern: {
                      value: /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,
                      message: "Invalid Egyptian phone number",
                    },
                  })}
                />
                  {errors.phone && (
                  <p className="text-danger">{`${errors.phone.message}`}</p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Birth Date</label>
                <input
                  type="date"
                  disabled={isProfile}
                  {...register("birthDate", {
                    required: "Please enter birth date",
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Birth date cannot be in the future",
                    },
                    min: {
                      value: "1900-01-01",
                      message: "Birth date cannot be before 1900",
                    },
                  })}
                />
                  {errors.birthDate && (
                  <p className="text-danger">{`${errors.birthDate.message}`}</p>
                )}
              </div>
            </div>

            {!isProfile && (
              <button type="submit" className={styles.submitButton}>
                Save
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
