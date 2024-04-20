// import { IUser } from "@/app/auth";
import { api } from "@/features/api";
import React, { useEffect } from "react";

function UserItem({ user }: { user: any }) {
  return <div></div>;
}

export default function UsersList({ searchValue }: { searchValue: string }) {
  useEffect(() => {
    console.log(searchValue);
    const fetchUsers = async () => {
      if (!searchValue) return;

      try {
        const res = await api.get(`/auth/search/${searchValue}`);
        const data = await res.data;

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [searchValue]);

  return <div></div>;
}
``;
