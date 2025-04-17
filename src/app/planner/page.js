"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/planner/calendar")}>
        Home principal live 1.0
      </button>
    </div>
  );
};

export default Home;
