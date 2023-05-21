import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center className="grid place-items-center h-screen">
      <div>
        <img
          src="https://pngimg.com/uploads/whatsapp/whatsapp_PNG20.png"
          alt="Whats App"
          className="h-52 w-52 mb-3"
        />
        <Circle color="#3cbc2b" size={60} />
      </div>
    </center>
  );
}

export default Loading;
