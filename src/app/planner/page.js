"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/planner/calendar")}>
        Home principal 1.3
      </button>
    </div>
  );
};

export default Home;
