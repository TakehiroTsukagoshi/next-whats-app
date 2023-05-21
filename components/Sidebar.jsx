import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar, Button, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  };

  return (
    <div
      className="flex-1 border-r h-screen overflow-y-scroll overscroll-none"
      style={{ minWidth: "300px", maxWidth: "350px" }}
    >
      <div className="flex sticky top-0 z-10 bg-white justify-between items-center p-4 h-20 border-b">
        <Avatar
          src={user.photoURL}
          className="cursor-pointer hover: opacity-80"
          onClick={() => auth.signOut()}
        />
        <div>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center rounded p-5">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search in chats"
          className="outline-none flex-1 border-none"
        />
      </div>

      <Button
        variant="outlined"
        style={{ outline: "none" }}
        className="w-full"
        onClick={createChat}
      >
        Start a new chats
      </Button>

      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  );
}

export default Sidebar;
