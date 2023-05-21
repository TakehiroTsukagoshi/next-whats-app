import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  return (
    <div
      className="flex items-center cursor-pointer p-4 break-words hover:bg-gray-100"
      onClick={enterChat}
    >
      {recipient ? (
        <Avatar src={recipient?.photoURL} className="mt-1 ml-1 mb-1 mr-4" />
      ) : (
        <Avatar className="mt-1 ml-1 mb-1 mr-4">{recipientEmail[0]}</Avatar>
      )}
      <p>{recipientEmail}</p>
    </div>
  );
}

export default Chat;
