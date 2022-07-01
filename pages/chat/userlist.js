import clientPromise from "../../lib/mongodb";
import Users from "../../components/Users"

import { useState, useEffect } from "react";
import {
  SearchIcon,
} from "@heroicons/react/outline";

export default function UserList({isConnected, users}) {
  const [searchUid, setSearchUid] = useState("")
  const [kickSearch, setKickSearch] = useState(false)
  const [foundUsers, setFoundUsers] = useState([])

  useEffect(async () => {
    if (searchUid.length === 0) {
      setFoundUsers([])
    }
  }, [searchUid])

  const handleSubmit = (e) => {
    e.preventDefault()
    setKickSearch(true)
  }

  useEffect(async () => {
    if (kickSearch) {
      const res = await (await fetch(`/api/usersearch?q=${searchUid}`)).json()
      setFoundUsers(res)
      setKickSearch(false)
    }
  }, [kickSearch])

  if (foundUsers.length>0) {
    users = foundUsers
  }

  return (
    <>
      <div className="relative mt-6 max-w-lg mx-auto text-xl text-black dark:text-black">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon className="h-5 w-5" />
        </span>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchUid(e.target.value)}
            value = {searchUid}
          />
        </form>
      </div>
      <Users users={users} />
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const isConnected = await client.isConnected();
  const db = client.db("chat");
  const collection = db.collection("users");
  const users = await collection.find({}).toArray();

  return {
    props: {
      isConnected,
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}