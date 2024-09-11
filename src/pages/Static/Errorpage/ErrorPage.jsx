import { useNavigate } from "react-router-dom";
function ErrorPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    // 👇️ replace set to true
    navigate("/", { replace: true });
  };
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="text-center gradient-text">
        <h1 className="mb-5 font-extrabold text-8xl">404</h1>
        <p className="text-4xl mb-5 font-medium">Not Found...</p>
      </div>
      <button className="btn" onClick={handleClick}>
        Home
      </button>
    </div>
  );
}

export default ErrorPage;
