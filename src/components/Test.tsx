import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Vilain from "./Vilain";
import { useNavigate } from "react-router-dom";

interface ResponseItem {
  question: string;
  userResponse: string;
  link: string;
}

function Test() {
  const [vilao, setVilao] = useState<string>("");
  const [motivo, setMotivo] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [responses, setResponses] = useState<ResponseItem[]>([
    {
      question: "Qual o seu tipo de lugar favorito?",
      userResponse: "Um porão escuro e silencioso, longe de tudo.",
      link: "https://i.imgur.com/IMvNAyp.jpeg",
    },
    {
      question: "Se você fosse um vilão, qual poder (e/ou) arma teria?",
      userResponse: "Telecinese e lâminas ocultas.",
      link: "https://i.imgur.com/F6xB0Ov.jpeg",
    },
    {
      question: "Qual seu maior medo?",
      userResponse: "O som de passos atrás de mim quando estou sozinho.",
      link: "https://i.imgur.com/msZ4TRP.jpeg",
    },
    {
      question: "Pelo o quê suas vítimas teriam que temer?",
      userResponse: "Elas nunca me veriam chegando. Só o silêncio.",
      link: "https://i.imgur.com/Cw5GWM1.jpeg",
    },
    {
      question:
        "Se alguém te traísse profundamente, o quê você faria com essa pessoa?",
      userResponse:
        "Faria ela desaparecer sem deixar rastro. Frio e calculado.",
      link: "https://i.imgur.com/lv7R1Dy.jpeg",
    },
    {
      question:
        "Se você pudesse desaparecer com algúem no mundo sem deixar vestígios, quem seria e por quê?",
      userResponse: "Meu antigo chefe. Ninguém sentiria falta.",
      link: "https://i.imgur.com/IMvNAyp.jpeg",
    },
    {
      question:
        "O quê existe de mais sombrio dentro de você e ninguém conhece?",
      userResponse: "Às vezes imagino como seria viver sem empatia.",
      link: "https://i.imgur.com/J2Q69to.jpeg",
    },
    {
      question: "Você já sentiu prazer em fazer algo errado?",
      userResponse: "Sim, principalmente quando senti que era merecido.",
      link: "https://i.imgur.com/RLj3Dru.jpeg",
    },
    {
      question:
        "Agora imagine que você está sendo observado. Quem (ou o quê) você acha que está te observando?",
      userResponse: "Uma entidade que sempre esteve comigo desde criança.",
      link: "https://i.imgur.com/lv7R1Dy.jpeg",
    },
    {
      question: "Qual sua lembrança mais estranha ou perturbadora?",
      userResponse:
        "Acordei e todos ao meu redor estavam imóveis, como se o tempo tivesse parado.",
      link: "https://i.imgur.com/HYAHimq.jpeg",
    },
    {
      question:
        "Você está sozinho em uma floresta à noite e encontra uma cabana com a porta entreaberta. O que faz?",
      userResponse:
        "Entro sem bater, como se algo lá dentro já estivesse me esperando.",
      link: "https://i.imgur.com/F6xB0Ov.jpeg",
    },
    {
      question:
        "Se você pudesse ouvir os pensamentos de qualquer pessoa, mas isso te enlouquecesse aos poucos, usaria esse poder?",
      userResponse:
        "Sim. Prefiro enlouquecer com verdades do que viver na ignorância.",
      link: "https://i.imgur.com/J2Q69to.jpeg",
    },
    {
      question:
        "Imagine que alguém te acorda toda noite no mesmo horário com um sussurro. O que você acha que ela quer?",
      userResponse:
        "Acho que está tentando me lembrar de algo que escolhi esquecer.",
      link: "https://i.imgur.com/msZ4TRP.jpeg",
    },
    {
      question:
        "Se você pudesse viver eternamente, mas preso a uma única casa mal-assombrada, aceitaria?",
      userResponse:
        "Sim. Com o tempo, eu me tornaria o fantasma que assombra os outros.",
      link: "https://i.imgur.com/Cw5GWM1.jpeg",
    },
    {
      question:
        "O que você faria se percebesse que ninguém mais consegue te ver ou ouvir?",
      userResponse:
        "Observava em silêncio... e anotava cada segredo que ouvia.",
      link: "https://i.imgur.com/HYAHimq.jpeg",
    },
    {
      question: "Qual foi o pesadelo mais vívido que você já teve? Descreva.",
      userResponse:
        "Eu caminhava num corredor sem fim. Atrás de mim, algo rastejava e sussurrava meu nome.",
      link: "https://i.imgur.com/RLj3Dru.jpeg",
    },
    {
      question:
        "Se fosse condenado a vagar para sempre como um espírito, o que faria nas noites silenciosas?",
      userResponse:
        "Sussurraria arrependimentos nos ouvidos de quem tenta dormir em paz.",
      link: "https://i.imgur.com/IMvNAyp.jpeg",
    },
    {
      question:
        "Existe alguma música, cheiro ou som que te causa arrepios sem motivo aparente? Qual?",
      userResponse:
        "O som de um relógio antigo marcando três da manhã. Sempre três.",
      link: "https://i.imgur.com/F6xB0Ov.jpeg",
    },
    {
      question:
        "Se tivesse que esconder um corpo e nunca ser descoberto, onde esconderia e como?",
      userResponse:
        "No porão de uma casa abandonada que ninguém ousa entrar. E selaria a entrada com concreto.",
      link: "https://i.imgur.com/lv7R1Dy.jpeg",
    },
    {
      question:
        "Você acredita que há algo observando você agora mesmo? Se sim, o que acha que é?",
      userResponse: "Não sei o que é… mas sei que está atrás da tela.",
      link: "https://i.imgur.com/J2Q69to.jpeg",
    },
  ]);

  const fetchImage = async (vilain: string) => {
    const options: object = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ vilain }),
    };

    const url = "http://localhost:5000/api/image";
    try {
      const data = await fetch(url, options);
      const response = await data.json();
      console.log(response);
      setLink(response);
    } catch (error) {
      console.error(error);
    }
  };

  const prompt = async () => {
    const url = "https://horrorsitebackend.onrender.com/api/analyzeresponse";
    setIsLoading(true);
    setSearched(false);

    const formated_responses: string[] = responses.map((response) => {
      return `Question = ${response.question} | User Response: ${response.userResponse}`;
    });

    const options: object = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ formated_responses }),
    };

    const fetchWithRetry = async (url: string, options: object, retries = 3, delay = 1000): Promise<any> => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          console.warn(`Tentando novamente... (${retries} restantes)`);
          await new Promise(res => setTimeout(res, delay));
          return fetchWithRetry(url, options, retries - 1, delay);
        } else {
          throw err;
        }
      }
    };

    try {
      const data = await fetchWithRetry(url, options);
      const data_final = await data.json();
      console.log(data_final.message.content);
      const data_final2 = JSON.parse(data_final.message.content);
      setVilao(data_final2.vilao);
      setMotivo(data_final2.motivo);
      setIsLoading(false);
      setSearched(true);
      await fetchImage(data_final2.vilao);
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
          <Vilain name={vilao} reason={motivo} link={link} />
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
            className="mySwiper !h-[60vh] !w-[90%] mt-5 shadow-2xl font-garamond"
          >
            {responses.map((response, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    backgroundImage: `url(${response.link})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full flex text-center p-2 justify-center items-center flex-col gap-3"
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

export default Test;
