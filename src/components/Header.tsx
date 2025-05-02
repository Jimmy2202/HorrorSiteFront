import { LuGhost } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full sm-custom:flex-col min-h-[20vh] flex flex-row justify-around items-center bg-black relative p-3 z-20">
      <h1 className="font-bruno text-[20px] text-white">Horror Site</h1>
      <ul className="w-fit sm-custom:w-full sm-custom:flex-col sm-custom:mt-10 h-full sm-custom:text-[5px] flex flex-row justify-end gap-3">
        <div
          onClick={() => navigate("/")}
          className="flex flex-col mr-5 font-orbitron text-[14px] justify-center items-center gap-3 text-white hover:text-orange-400 transition ease-in-out duration-500 hover:cursor-pointer"
        >
          <LuGhost className="scale-[2] sm-custom:scale-125" />
          <p>Início</p>
        </div>
        <div
          onClick={() => navigate("/movies")}
          className="flex flex-col mr-5 font-orbitron text-[14px] justify-center items-center gap-3 text-white hover:text-orange-400 transition ease-in-out duration-500 hover:cursor-pointer"
        >
          <LuGhost className="scale-[2] sm-custom:scale-125" />
          <p>Filmes</p>
        </div>
        <div
          onClick={() => navigate("/test")}
          className="flex flex-col mr-5 font-orbitron text-[14px] justify-center items-center gap-3 text-white hover:text-orange-400 transition ease-in-out duration-500 hover:cursor-pointer"
        >
          <LuGhost className="scale-[2] sm-custom:scale-125" />
          <p>Teste de Personagem</p>
        </div>
      </ul>
    </header>
  );
}

export default Header;
