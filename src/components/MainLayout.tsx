import { useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();
  return (
    <div className="w-[90%] p-4 h-fit flex flex-col gap-5 z-20 text-center">
      <div
        onClick={() => navigate("/movies")}
        className="w-full bg-white p-5 shadow-2xl hover:cursor-pointer hover:bg-black hover:scale-110 hover:text-white transition ease-in-out duration-500"
      >
        Ver Uma Lista de filmes de Horror!
      </div>
      <div
        onClick={() => navigate("/test")}
        className="w-full bg-white p-5 shadow-2xl hover:cursor-pointer hover:bg-black hover:scale-110 hover:text-white transition ease-in-out duration-500"
      >
        Descobrir qual personagem de terror mais combina comigo!...
      </div>
    </div>
  );
}

export default MainLayout;
