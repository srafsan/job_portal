"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ManageUsersTable from "./ManageUsersTable";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
  sid: string;
}

const ManageUsers = () => {
  const [users, setUsers] = useState<User[]>([]); // Use a more specific type instead of 'any[]'

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
      } catch (err) {
        const errorRes = err as any;

        if (errorRes.response) {
          console.log(errorRes.response.data);
          console.log(errorRes.response.status);
        } else {
          console.log(`Error: ${errorRes.message}`);
        }
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>This is for managing Users!</h2>
      <ManageUsersTable users={users} />
    </div>
  );
};

export default ManageUsers;
