import { LuGhost } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full sm-custom:flex-col sm-custom:justify-center sm-custom:items-center min-h-[20vh] flex flex-row justify-around items-center bg-black/[0.8] sm-custom:p-0 relative p-3 z-20">
      <h1 className="font-bruno text-[20px] text-white">Horror Site</h1>
      <ul className="w-fit sm-custom:mb-3 sm-custom:text-[10px] text-[12px] sm-custom:w-full sm-custom:flex-col sm-custom:justify-center sm-custom:items-center sm-custom:mt-5 h-full flex flex-row justify-end gap-3">
        <li
          onClick={() => navigate("/")}
          className="flex flex-col mr-5 font-orbitron justify-center items-center gap-3 text-white hover:text-red-600 transition ease-in-out duration-500 hover:cursor-pointer"
        >
          <LuGhost className="scale-[2] sm-custom:scale-125" />
          <p>Início</p>
        </li>

        <li
          onClick={() => navigate("/movies")}
          className="flex flex-col mr-5 font-orbitron justify-center items-center gap-3 text-white hover:text-red-600 transition ease-in-out duration-500 hover:cursor-pointer"
        >
          <LuGhost className="scale-[2] sm-custom:scale-125" />
          <p>Filmes</p>
        </li>

        <li
          onClick={() => navigate("/test")}
          className="flex flex-col mr-5 font-orbitron justify-center items-center gap-3 text-white hover:text-red-600 transition ease-in-out duration-500 hover:cursor-pointer"
        >
          <LuGhost className="scale-[2] sm-custom:scale-125" />
          <p>Teste de Personagem</p>
        </li>

        <li
          onClick={() => navigate("/test2")}
          className="flex flex-col mr-5 font-orbitron justify-center items-center gap-3 text-white hover:text-red-600 transition ease-in-out duration-500 hover:cursor-pointer"
        >
          <LuGhost className="scale-[2] sm-custom:scale-125" />
          <p>Teste de Filme</p>
        </li>
      </ul>
    </header>
  );
}

export default Header;
