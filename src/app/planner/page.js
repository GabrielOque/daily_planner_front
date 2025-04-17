"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_ENV;

  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/planner/calendar")}>
        Home principal updated by Gabriel
      </button>
      <p>{`API URL: ${apiUrl}`}</p>
      <p>{`API Key: ${apiKey}`}</p>
    </div>
  );
};

export default Home;
