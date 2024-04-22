import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, userDeleted, userUpdated } from "./userSlice";
import { Button } from "react-bootstrap";
import { deleteUser, updateUser } from "../../services/userService";
import { toast } from "react-toastify";

export default function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDelete = (userId) => {
    deleteUser(userId)
      .then((response) => {
        console.log("User deleted: ", response);
        if (response.status === 200) {
          dispatch(userDeleted(userId));
          toast.success("User deleted successfully");
        }
      })
      .catch((error) => {
        console.log("Error deleting user: ", error);
        toast.error(error.response);
      });
  };

  const handleIsAdmin = (userId) => {
    const user = users.find((user) => user._id === userId);
    const updateduser = { ...user, isAdmin: !user.isAdmin };
    updateUser(userId, updateduser)
      .then((response) => {
        console.log("User updated: ", response);
        if (response.status === 200) {
          dispatch(userUpdated(updateduser));
          toast.success("User updated successfully");
        }
      })
      .catch((error) => {
        console.log("Error updating user: ", error);
        toast.error("Error updating user");
      });
  };

  return (
    <div>
      <h1>Users</h1>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  onClick={() => {
                    if (user.isAdmin) {
                      handleIsAdmin(user._id);
                    } else {
                      handleIsAdmin(user._id);
                    }
                  }}
                  variant={user.isAdmin ? "danger" : "success"}
                >
                  {user.isAdmin ? "Demote " : "Promote"}
                </Button>
              </td>
              {/* Add a delete button */}
              <td>
                <Button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
