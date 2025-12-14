import React, { useEffect, useContext, useState } from "react";
import styles from "./UserData.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

export default function UserData() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginData } = useContext(AuthContext);

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
                }}
              />
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* First + Last Name */}
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>First Name</label>
                <input
                  disabled={isProfile}
                  {...register("firstName", { required: "Required" })}
                />
                {errors.firstName && (
                  <p className="text-danger">{`${errors.firstName.message}`}</p>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label>Last Name</label>
                <input
                  disabled={isProfile}
                  {...register("lastName", { required: "Required" })}
                />
                {errors.lastName && (
                  <p className="text-danger">{`${errors.lastName.message}`}</p>
                )}
              </div>
            </div>

            {/* Email + Age */}
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  disabled={isProfile}
                  {...register("email", { required: "Required" })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Age</label>
                <input
                  type="number"
                  disabled={isProfile}
                  {...register("age", { required: "Required" })}
                />
              </div>
            </div>

            {/* Phone + Birth Date */}
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Phone</label>
                <input
                  disabled={isProfile}
                  {...register("phone", { required: "Required" })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Birth Date</label>
                <input
                  type="date"
                  disabled={isProfile}
                  {...register("birthDate", { required: "Required" })}
                />
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
