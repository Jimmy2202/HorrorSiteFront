import { useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();
  return (
    <div className="w-[90%] p-4 h-fit flex flex-col gap-5 z-20 text-center">
      <div
        onClick={() => navigate("/movies")}
        className="divchoose w-full relative hover:bg-black/[0.7] hover:backdrop-blur-sm bg-white p-5 shadow-lg shadow-black hover:cursor-pointer hover:scale-110 hover:text-white transition ease-in-out duration-500"
      >
        Ver Uma Lista de filmes de Horror!
        <img
          src="https://i.imgur.com/bS0gNFG.gif"
          alt=""
          className="absolute w-[80px] h-[60px] right-0 bottom-0 z-10"
        />
        <img
          src="https://i.imgur.com/bS0gNFG.gif"
          alt=""
          className="absolute scale-x-[-1] w-[80px] h-[60px] left-0 bottom-0 z-10"
        />
      </div>
      <div
        onClick={() => navigate("/test")}
        className="divchoose w-full relative hover:bg-black/[0.7] hover:backdrop-blur-sm  bg-white p-5 shadow-lg shadow-black hover:cursor-pointer hover:scale-110 hover:text-white transition ease-in-out duration-500"
      >
        Descobrir qual personagem de terror eu me pareço!
        <img
          src="https://i.imgur.com/bS0gNFG.gif"
          alt=""
          className="absolute w-[80px] h-[60px] right-0 bottom-0 z-10"
        />
        <img
          src="https://i.imgur.com/bS0gNFG.gif"
          alt=""
          className="absolute scale-x-[-1] w-[80px] h-[60px] left-0 bottom-0 z-10"
        />
      </div>
    </div>
  );
}

export default MainLayout;
