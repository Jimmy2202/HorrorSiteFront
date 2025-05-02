type Props = {
  name: string;
  reason: string;
  link: string;
};

function Vilain({ name, reason, link }: Props) {
  return (
    <div className="w-[30vw] sm-custom:w-[95%] min-h-[30vh] text-center justify-center items-center mt-5 h-fit bg-black flex flex-col p-5 shadow-2xl shadow-black relative animate-float">
      <img
        src="https://i.imgur.com/5eUn2vL.gif"
        className="absolute left-0 top-0 w-full h-[50vh]"
        alt=""
      />
      {link != "" ? <img src={link} alt="" className="w-[50%] h-[20%]" /> : ""};
      <h1 className="text-white mb-5">
        Você seria <span className="font-bruno animate-pulse">{name}</span>
      </h1>
      <h1 className="text-white text-[10px] font-orbitron">{reason}</h1>
    </div>
  );
}

export default Vilain;
