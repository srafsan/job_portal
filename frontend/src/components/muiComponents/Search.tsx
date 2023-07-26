"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch("");
    router.push(`/${search}/`);
  };

  return <form></form>;
};

export default Search;
