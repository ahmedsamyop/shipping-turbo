import { useSelector } from "react-redux";
function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  return (
    <div>
      <div>{userData.id && <p className="text-green-600 mb-5">Admin-ID: {userData.id}</p>}</div>
      <div className="gradient-text text-6xl font-extrabold w-fit m-auto">Coming Soon ...</div>
    </div>
  );
}

export default Dashboard;
