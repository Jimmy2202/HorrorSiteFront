import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import Movie from "./Movie";

interface ResponseItem {
  question: string;
  userResponse: string;
  link: string;
}

interface DataMovies {
  title: string;
  overview: string;
  poster_path: string;
}

function Test2() {
  const [motivo, setMotivo] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [movie, setMovie] = useState<DataMovies>({
    title: "",
    overview: "",
    poster_path: "",
  });
  const [responses, setResponses] = useState<ResponseItem[]>([
    {
      question:
        "Que tipo de ambiente te transmite paz… mesmo que a maioria o considerasse perturbador?",
      userResponse: "Um porão escuro e silencioso, longe de tudo.",
      link: "https://i.imgur.com/IMvNAyp.jpeg",
    },
    {
      question:
        "Se você tivesse um dom sobrenatural sombrio, qual seria e como o usaria sem ser notado?",
      userResponse: "Telecinese e lâminas ocultas.",
      link: "https://i.imgur.com/F6xB0Ov.jpeg",
    },
    {
      question:
        "Qual é o tipo de medo que te paralisa mesmo quando está seguro?",
      userResponse: "O som de passos atrás de mim quando estou sozinho.",
      link: "https://i.imgur.com/msZ4TRP.jpeg",
    },
    {
      question:
        "Se fosse uma entidade do medo, o que seria sua assinatura? O que te tornaria inesquecível para quem te viu?",
      userResponse: "Elas nunca me veriam chegando. Só o silêncio.",
      link: "https://i.imgur.com/Cw5GWM1.jpeg",
    },
    {
      question:
        "A traição deixa marcas. Se alguém te ferisse fundo, como essa pessoa desapareceria da sua história?",
      userResponse:
        "Faria ela desaparecer sem deixar rastro. Frio e calculado.",
      link: "https://i.imgur.com/lv7R1Dy.jpeg",
    },
    {
      question:
        "Se tivesse o poder de apagar alguém da realidade, quem seria e qual seria sua justificativa sombria?",
      userResponse: "Meu antigo chefe. Ninguém sentiria falta.",
      link: "https://i.imgur.com/IMvNAyp.jpeg",
    },
    {
      question:
        "Existe algo dentro de você que nunca foi revelado... algo obscuro demais para colocar em palavras?",
      userResponse: "Às vezes imagino como seria viver sem empatia.",
      link: "https://i.imgur.com/J2Q69to.jpeg",
    },
    {
      question:
        "O erro pode ser doce. Conte uma vez em que fazer o errado foi... deliciosamente satisfatório.",
      userResponse: "Sim, principalmente quando senti que era merecido.",
      link: "https://i.imgur.com/RLj3Dru.jpeg",
    },
    {
      question:
        "Imagine agora que você está sendo vigiado. Quem — ou o quê — seria capaz de seguir seus passos desde a infância?",
      userResponse: "Uma entidade que sempre esteve comigo desde criança.",
      link: "https://i.imgur.com/lv7R1Dy.jpeg",
    },
    {
      question:
        "Qual memória da sua vida parece ter vindo de outro plano, como se não fosse sua… ou real?",
      userResponse:
        "Acordei e todos ao meu redor estavam imóveis, como se o tempo tivesse parado.",
      link: "https://i.imgur.com/HYAHimq.jpeg",
    },
  ]);

  const fetchMovie = (filme: string, movies: DataMovies[]) => {
    movies.forEach((movie) => {
      console.log(movie);
      if (movie.title == filme) {
        console.log(movie);
        setMovie(movie);
      }
    });
  };

  const prompt = async () => {
    const url = "https://horrorsitebackend.onrender.com/api/analyzeresponse2";
    const url2 = "https://horrorsitebackend.onrender.com/api/movies";
    const response = await fetch(url2);
    const datamovies: DataMovies[] = await response.json();
    setIsLoading(true);
    setSearched(false);

    const formated_responses: string[] = responses.map((response) => {
      return `Question = ${response.question} | User Response: ${response.userResponse}`;
    });

    const array_movies: string[] = datamovies.map((movie) => {
      return `Movie: ${movie.title} | Overview: ${movie.overview}`;
    });

    const resultfinal: string[] = formated_responses.concat(array_movies);

    const options: object = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ resultfinal }),
    };

    try {
      const data = await fetch(url, options);
      const data_final = await data.json();
      console.log(data_final.message.content);
      const data_final2 = JSON.parse(data_final.message.content);
      setMotivo(data_final2.motivo);
      fetchMovie(data_final2.filme, datamovies);
      setIsLoading(false);
      setSearched(true);
    } catch (error) {
      navigate("/");
      console.error(error);
    }
  };

  return (
    <div className="w-full min-h-screen h-fit flex flex-col gap-3 justify-start items-center z-20">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center mt-20 gap-4 ">
          <img
            src="https://i.imgur.com/y2uX2k0.gif"
            className="w-[80px] h-[80px]"
            alt=""
          />
          <p className="text-white animate-pulse font-bruno">
            Analisando suas respostas
          </p>
        </div>
      ) : searched ? (
        <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
          <Movie
            name={movie.title}
            overview={movie.overview}
            poster_path={movie.poster_path}
          />
          <h1 className="w-[90%] text-center p-4 text-white bg-black/[0.5]">
            {motivo}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="hover:scale-105 hover:bg-white hover:text-black transition ease-in-out duration-500 p-5 min-w-[20vw] min-h-[10vh] bg-black text-center text-white"
          >
            Voltar Para o Menu
          </button>
          <button
            onClick={() => {
              setSearched(false);
              setIsLoading(false);
            }}
            className="hover:scale-105 hover:bg-white hover:text-black transition ease-in-out duration-500 p-5 min-w-[20vw] min-h-[10vh] bg-black text-center text-white"
          >
            Refazer Teste
          </button>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col gap-3 justify-start items-center">
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              } as React.CSSProperties
            }
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper !h-[60vh] !w-[90%] mt-5 shadow-xl shadow-black font-garamond"
          >
            {responses.map((response, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    backgroundImage: `url(${response.link})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full flex justify-center items-center flex-col gap-3"
                >
                  <h1 className="text-white">{response.question}</h1>
                  <input
                    type="text"
                    placeholder="Responda aqui..."
                    className="text-center w-[70%] min-h-[50%] h-fit text-white bg-black/[0.8]"
                    onChange={(e) => {
                      const newResponses = [...responses];
                      newResponses[index].userResponse = e.target.value;
                      setResponses(newResponses);
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={prompt}
            className="hover:scale-105 mt-5 ring-4 ring-red-600 sm-custom:w-[90vw] hover:bg-red-500 hover:text-black transition ease-in-out duration-500 p-2 w-[20vw] h-[10vh] bg-black text-center text-white"
          >
            Enviar Respostas
          </button>
        </div>
      )}
    </div>
  );
}

export default Test2;
