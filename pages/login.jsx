import Head from "next/head";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

function login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-200">
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex flex-col items-center bg-white p-24 rounded-md shadow-2xl">
        <img
          className="h-52 w-52 mb-12"
          src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG20.png"
          alt="Whats App"
        />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default login;
