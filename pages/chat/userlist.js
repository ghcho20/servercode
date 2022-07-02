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
  const [autoComplete, setAutoComplete] = useState([])
  const [useFuzzy, setUseFuzzy] = useState(false)

  useEffect(async () => {
    if (searchUid.length === 0) {
      setFoundUsers([])
      setAutoComplete([])
    } else if (!kickSearch) {
      const res = await
        (await fetch(`/api/userautocomplete?q=${searchUid}`)).json()
      setAutoComplete(res)
    }
  }, [searchUid])

  const handleSubmit = (e) => {
    e.preventDefault()
    setKickSearch(true)
    setUseFuzzy(true)
  }

  useEffect(async () => {
    if (kickSearch) {
      const res = await (await fetch(`/api/usersearch?q=${searchUid}&fuzzy=${useFuzzy}`)).json()
      setFoundUsers(res)
      setKickSearch(false)
      setAutoComplete([])
    }
  }, [kickSearch])

  if (foundUsers.length>0) {
    users = foundUsers
  }

  const handleSelect = (uid) => {
    setSearchUid(uid)
    setKickSearch(true)
    setUseFuzzy(false)
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
        {autoComplete.length >0 && (
          <ul className="absolute inset-x-0 top-full bg-green-200 border border-green-500 rounded-md z-20">
            {
              autoComplete.map(item => {
                return (
                  <li
                    key={item._id}
                    className="px-4 py-2 hover:bg-green-300 cursor-pointer"
                    onClick={e => handleSelect(item.user_id)}
                  >
                    {item.nickname? item.nickname : item.user_id}
                  </li>
                )
              })
            }
          </ul>
        )}
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