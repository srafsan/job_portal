// "use client";
import React from "react";
import { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Users",
};

const UsersPage = async () => {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  const content = (
    <section>
      <h2>
        <Link href="/">Back to Home</Link> <br />
      </h2>
      {users.map((user) => {
        return (
          <>
            <p key={user.id}>
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </p>
            <br />
          </>
        );
      })}
    </section>
  );

  return content;
};

export default UsersPage;
