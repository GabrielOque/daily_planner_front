"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="relative h-full w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://res.cloudinary.com/dlyvpslli/video/upload/v1746334682/jjlpz8z8wforbnoxbsvc.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center h-full text-white px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
          Eleva tu productividad
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-10 drop-shadow-md">
          Organiza tu día, prioriza tus metas y mantente enfocado. Esta app está
          diseñada para ayudarte a alcanzar tu máximo potencial, de forma simple
          y efectiva.
        </p>
        <button
          onClick={() => router.push("/planner/calendar")}
          className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-200 transition"
        >
          Comenzar ahora
        </button>
      </div>
    </div>
  );
};

export default Home;
