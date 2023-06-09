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
      const response = await axios.get("http://localhost:2023/token");
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
        const response = await axios.get("http://localhost:2023/token");
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
    const response = await axiosJWT.get("http://localhost:2023/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data.response);
    setUsers(response.data.response);
  };

  function ConfirmDelete() {
    return window.confirm("Hapus Data Ini?");
  }

  const deleteUser = async (userId) => {
    try {
      if (ConfirmDelete()) {
        await axios.delete(`http://localhost:2023/users/${userId}`);
      } else {
        getUsers();
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.msg);
      }
    }
    getUsers();
  };

  return (
    <div>
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css?family=Nunito"
        rel="stylesheet"
        type="text/css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
      />
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Welcome Admin </h2>
      <Link to="/users/add" className="button is-primary mb-2">
        Tambah User
      </Link>
      <br />
      <div className="card has-table">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon">
              <i className="mdi mdi-table"></i>
            </span>
            Data User
          </p>
          <a href="#" className="card-header-icon">
            <span className="icon">
              <i className="mdi mdi-reload"></i>
            </span>
          </a>
        </header>
        <div className="card-content">
          <div className="b-table has-pagination ">
            <div className="table-wrapper has-mobile-cards">
              <table className="table is-fullwidth is-striped is-hoverable is-fullwidth ">
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
                      <td data-label="No">{index + 1}</td>
                      <td data-label="Nama">{user.name}</td>
                      <td data-label="Email">{user.email}</td>
                      <td data-label="Role User">{user.role}</td>
                      <td>
                        <Link
                          to={`/users/edit/${user.uuid_user}`}
                          className="button is-small is-info"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteUser(user.uuid_user)}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
