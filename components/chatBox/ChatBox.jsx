import React, { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "timeago.js";
import { useSession } from "next-auth/react";

const ChatBox = ({ message, own, currentUser }) => {
  console.log("message in chat box", message);
  console.log("message in chat box", message);
  const { data: session } = useSession();
  const [user, setUser] = useState([]);
  const [friendId, setFriendId] = useState(null);

  useEffect(() => {
    const currentUserId = session?.user?.id;
    {
      message.sender !== currentUserId && setFriendId(message.sender);
    }
    console.log("Friend Id inside chatbox", friendId);

    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${friendId}`);

        const data = await response.json();

        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (friendId !== null) {
      getUser();
    }
  }, [currentUser, friendId]);
  // console.log("user in chat box", user);

  return (
    <>
      {user !== null ? (
        <>
          {own !== true ? (
            <div class=" max-w-125">
              <p class="mb-2.5 text-sm font-medium">
                {" "}
                {user[0]?.firstname} {user[0]?.middlename}
              </p>
              <div class="mb-2.5 rounded-2xl rounded-tl-none bg-gray px-5 py-3 dark:bg-boxdark-2">
                <p class="font-medium">{message.text}</p>
              </div>
              <p class="text-xs font-medium">{format(message.createdAt)}</p>
            </div>
          ) : (
            <div class="ml-auto max-w-125">
              <div class="mb-2.5 rounded-2xl rounded-br-none bg-primary px-5 py-3">
                <p class="font-medium text-white">{message.text}</p>
              </div>
              <p class="text-right text-xs font-medium">
                {format(message.createdAt)}
              </p>
            </div>
          )}
        </>
      ) : (
        <div>
          <h2>please choose a user to chat</h2>
        </div>
      )}
    </>
  );
};

export default ChatBox;
