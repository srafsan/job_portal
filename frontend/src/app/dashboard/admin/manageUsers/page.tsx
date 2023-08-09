"use client";
import React, { useEffect, useState } from "react";
import ManageUsersTable from "./ManageUsersTable";
import apiClient, { setClientAuthHeader } from "@/utils/apiClient";

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
        setClientAuthHeader();
        const response = await apiClient.get("/dashboard/admin/manage_users");
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
