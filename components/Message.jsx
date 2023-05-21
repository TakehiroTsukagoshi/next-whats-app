import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Message({ user, message }) {
  const [userLoggedIn] = useAuthState(auth);

  return (
    <div>
      {user === userLoggedIn.email ? (
        <p
          className="p-2 rounded m-3 pb-2 relative text-center ml-auto bg-green-200"
          style={{ minWidth: "60px", width: "fit-content" }}
        >
          {message.message}
        </p>
      ) : (
        <p
          className="p-2 rounded m-3 pb-2 relative text-center ml-auto bg-gray-200"
          style={{ minWidth: "60px", width: "fit-content" }}
        >
          {message.message}
        </p>
      )}
    </div>
  );
}

export default Message;
