import { useEffect, useState } from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Movie from "./Movie";
import { useNavigate } from "react-router-dom";

function Home() {
  interface DataMovies {
    title: string;
    overview: string;
    poster_path: string;
  }

  const [movies, setMovies] = useState<DataMovies[]>([]);
  const [movie, setMovie] = useState<DataMovies>({
    title: "",
    overview: "",
    poster_path: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const [isLoadingRand, setIsLoadingRand] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWithRetry = async (
      url: string,
      retries = 3,
      delay = 1000
    ): Promise<any> => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          console.warn(`Tentando novamente... (${retries} restantes)`);
          await new Promise((res) => setTimeout(res, delay));
          return fetchWithRetry(url, retries - 1, delay);
        } else {
          throw err;
        }
      }
    };

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetchWithRetry(
          "https://horrorsitebackend.onrender.com/api/movies"
        );
        setMovies(response);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const fetchRandomMovie = () => {
    setIsLoadingRand(true);
    const index = Math.floor(Math.random() * movies.length);
    setIsLoadingRand(false);
    setMovie(movies[index]);
    setSearched(true);
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center relative z-20">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center mt-10 gap-4 ">
          <AiOutlineLoading3Quarters className="text-white animate-spin ease-in-out" />
          <p className="text-white animate-pulse font-bruno">
            Carregando Filmes
          </p>
        </div>
      ) : isLoadingRand ? (
        <div className="flex flex-col justify-center items-center mt-10 gap-4 ">
          <AiOutlineLoading3Quarters className="text-white animate-spin ease-in-out" />
          <p className="text-white animate-pulse font-bruno">
            Escolhendo um filme para você...
          </p>
        </div>
      ) : searched ? (
        <div className="absolute top-4 flex w-fit flex-col gap-2 justify-center items-center">
          <Movie
            name={movie.title}
            overview={movie.overview}
            poster_path={movie.poster_path}
          />
          <button
            onClick={fetchRandomMovie}
            className="hover:scale-105 hover:bg-white hover:text-black transition ease-in-out duration-500 p-5 min-w-[20vw] min-h-[10vh] bg-black text-center text-white"
          >
            Não curti... Quero Escolher Outro!
          </button>
          <button
            onClick={() => navigate("/")}
            className="hover:scale-105 hover:bg-white hover:text-black transition ease-in-out duration-500 p-5 min-w-[20vw] min-h-[10vh] bg-black text-center text-white"
          >
            Voltar Para o Menu
          </button>
        </div>
      ) : (
        <div className="relative flex flex-col shadow-2xl sm-custom:h-[80vh] bg-black/[0.3]  shadow-black text-black w-[90vw] sm-custom:mt-10 overflow-x-auto gap-1 justify-start items-center">
          <h1 className="w-full text-red-300 sm-custom:mr-6 mt-4 p-3 text-center bg-black/[0.5]">
            Selecione um filme e deslize para o lado para ver o próximo...
          </h1>
          <Swiper
            speed={600}
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              } as React.CSSProperties
            }
            pagination={{
              clickable: true,
            }}
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper overflow-hidden !max-h-[100vh] !w-[30vw] sm-custom:!w-[40vw] sm-custom:mt-10 top-28 !rounded-2xl"
          >
            {movies.map((movies, index) => (
              <SwiperSlide className="!h-full !w-full !relative rounded-2xl border">
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`relative flex flex-col h-[90vh] sm-custom:h-[40vh] rounded-2xl`}
                  data-swiper-parallax={"-300"}
                >
                  <h1
                    data-swiper-parallax="-200"
                    className="bg-black/[0.5] text-white p-4"
                  >
                    {movies.title}
                  </h1>
                  <h1
                    className="absolute bottom-0 sm-custom:hidden text-[10px] p-3 text-white bg-black/[0.7] w-full"
                    data-swiper-parallax="-100"
                  >
                    {movies.overview}
                  </h1>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={fetchRandomMovie}
            className="hover:scale-105 sm-custom:scale-75 hover:bg-white hover:text-black shadow-md shadow-red-500 rounded-xl absolute top-20 transition ease-in-out duration-500 p-5 min-w-[20vw] min-h-[10vh] bg-red-700 text-center text-white"
          >
            Clique aqui para escolher um filme para ver hoje...
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;

/* <div className="bg-[#0f0f0f] relative text-white h-screen w-full overflow-x-auto flex flex-col gap-1 justify-start items-center">
      <h1 className="w-full p-3 text-center bg-black/[0.5]">
        Deslize para ver todos os filmes...
      </h1>
      <Swiper
        speed={600}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        pagination={{
          clickable: true,
        }}
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper !h-full !w-[30vw] left-0 top-28 !rounded-2xl"
      >
        {movies.map((movies, index) => (
          <SwiperSlide className="!h-fit !w-full !relative rounded-2xl border">
            <div
              key={index}
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies.poster_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`relative flex flex-col h-[90vh] rounded-2xl`}
              data-swiper-parallax={"-300"}
            >
              <h1
                data-swiper-parallax="-200"
                className="bg-black/[0.5] text-white p-4"
              >
                {movies.title}
              </h1>
              <h1
                className="absolute bottom-0 text-[10px] p-3 text-white bg-black/[0.7] w-full"
                data-swiper-parallax="-100"
              >
                {movies.overview}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="hover:scale-105 hover:bg-white hover:text-black absolute top-20 transition ease-in-out duration-500 p-5 min-w-[20vw] min-h-[10vh] bg-black text-center text-white">
        Escolher um filme para ver hoje...
      </button>
    </div> */
