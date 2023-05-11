import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Userlist = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    RefreshToken();
    getUsers();
  }, []);

  const RefreshToken = async () => {
    try {
      const response = await axios.get("http://52.199.149.14:2024/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        // history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://52.199.149.14:2024/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://52.199.149.14:2024/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setUsers(response.data.response);
  };

  const deleteUser = async (userId) => {
    RefreshToken();
    await axiosJWT.delete(`http://52.199.149.14:2024/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getUsers();
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Welcome Admin </h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
