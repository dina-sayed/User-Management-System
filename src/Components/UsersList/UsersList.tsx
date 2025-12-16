import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { UserListInterface } from "./UserListInterface.ts";
import styles from "./UsersList.module.css";

export default function UsersList() {

  
  const [users, setUsers] = useState<UserListInterface[]>([]);
  const navigate = useNavigate();


  const getUsers = async () => {
    const res = await axios.get("https://dummyjson.com/users");
    setUsers(res.data.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const goToAdd = () => {
    navigate("/home/user-data");
  };

  const goToUpdate = (id: number) => {
    navigate("/home/user-data", { state: { id } });
  };

  const goToProfile = (id: number) => {
    navigate("/home/user-data", { state: { mode: "profile", id } });
  };

  const deleteUser = (id: number, name: string) => {
    Swal.fire({
      title: `Delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`https://dummyjson.com/users/${id}`);
        setUsers(oldUsers  => oldUsers.filter(user => user.id !== id));
        Swal.fire("Deleted!", "User deleted successfully.", "success");
      }
    });
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Users List</h1>
        <button onClick={goToAdd} className={styles.button}>
          ADD NEW USER
        </button>
      </div>

      <div className="table-container ms-5 p-0">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.image}
                    alt=""
                    className="w-25 rounded-circle"
                  />
                </td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <i
                    className="fa fa-edit text-warning fs-4"
                    onClick={() => goToUpdate(user.id)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <i
                    className="fa fa-trash text-danger fs-4"
                    onClick={() => deleteUser(user.id, user.firstName)}
                    style={{ cursor: "pointer", marginRight: "10px" }}
                  />
                  <i
                    className="fa fa-user text-primary fs-4"
                    onClick={() => goToProfile(user.id)}
                    style={{ cursor: "pointer" }}
                    title="View Profile"

                  />
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
