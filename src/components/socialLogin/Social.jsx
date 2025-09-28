import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function Social() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        if (result) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <button
      onClick={handleLogin}
      className="btn w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
    >
      <svg
        className="w-5 h-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path
          fill="#fff"
          d="M44.5 20H24v8.5h11.8C34.8 34.5 30.1 38 24 38c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 3.1l6-6C34.6 5.5 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.8 0 20-7.9 20-21 0-1.3-.1-2.3-.5-4z"
        />
      </svg>
      Login with Google
    </button>
  );
}
