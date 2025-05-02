type DataMovie = {
  name: string;
  overview: string;
  poster_path: string;
};

function Movie({ name, overview, poster_path }: DataMovie) {
  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className={`relative flex flex-col w-[20vw] sm-custom:w-[50vw] sm-custom:mt-1 h-[60vh] m-auto mt-10 shadow-2xl animate-float2`}
      data-swiper-parallax={"-300"}
    >
      <h1 data-swiper-parallax="-200" className="bg-black/[0.5] text-white p-4">
        {name}
      </h1>
      <h1
        className="absolute bottom-0 text-[10px] p-3 text-white bg-black/[0.7] w-full"
        data-swiper-parallax="-100"
      >
        {overview}
      </h1>
    </div>
  );
}

export default Movie;
