import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Vilain from "./Vilain";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Test() {
  const [vilao, setVilao] = useState<string>("");
  const [motivo, setMotivo] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [responses, setResponses] = useState<object[]>([
    {
      question: "Qual o seu tipo de lugar favorito?",
      userResponse: "Um porão escuro e silencioso, longe de tudo.",
      link: "https://i.imgur.com/9w5ieCG.jpeg",
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
      question:
        "Pra finalizar,qual sua lembrança mais estranha ou perturbadora?",
      userResponse:
        "Acordei e todos ao meu redor estavam imóveis, como se o tempo tivesse parado.",
      link: "https://i.imgur.com/HYAHimq.jpeg",
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
    const url = "http://localhost:5000/api/analyzeresponse";
    setIsLoading(true);
    setSearched(false);

    const formated_responses: string[] = responses.map((response, index) => {
      return `Question = ${response.question} | User Response: ${response.userResponse}`;
    });

    const options: object = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ formated_responses }),
    };

    try {
      const data = await fetch(url, options);
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
        <Vilain name={vilao} reason={motivo} link={link} />
      ) : (
        <div className="w-full h-full flex flex-col gap-3 justify-start items-center">
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
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
            className="hover:scale-105 sm-custom:w-[90vw] hover:bg-white hover:text-black transition ease-in-out duration-500 p-2 w-[20vw] h-[10vh] bg-black text-center text-white"
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
}

export default Test;
