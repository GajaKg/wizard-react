import { useState, type FC } from "react";
import { Card } from 'primereact/card';
import { useAppSelector } from "../store/hooks";
import { type Leaderboard } from "../store/gameSlice";
import { Link } from "react-router";

const Leaderboard: FC = () => {
  const leaderboard = useAppSelector((state) => state.game.leaderboard);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(true);

  let leaderboardData = [];

  if (showLeaderboard) {
    leaderboardData = leaderboard;
  } else {
    const copyLeaderboard = JSON.parse(JSON.stringify(leaderboard));
    leaderboardData = [...copyLeaderboard].sort((a, b) => b.score - a.score);
  }

  const LeaderboardList = leaderboardData.map((attempt: Leaderboard, i: number) => {
    return (
      <li key={i}>
        Attempt {attempt.counter} - {attempt.score} {attempt.score <= 1 ? "answer" : "answers"}
      </li>
    )
  });

  const toggleLeaderboard = (show: boolean) => {
    setShowLeaderboard(show);
  }

  return (
    <Card className="flex items-center justify-center flex-col m-auto w-full max-w-sm md:max-w-xl rounded shadow-xl p-4 overflow-auto" style={{ height: "80vh" }} >
      <div className="flex mb-6">
        <button
          onClick={() => toggleLeaderboard(true)}
          className="bg-transparent cursor-pointer hover:bg-blue-400 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Leaderboard
        </button>
        <button
          onClick={() => toggleLeaderboard(false)}
          className="bg-transparent cursor-pointer hover:bg-blue-400 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Best of
        </button>
      </div>
      <h2 className="mb-2 text-2xl font-semibold text-center">{showLeaderboard ? "Leaderboard" : "Best of"}: </h2>
      {leaderboardData.length > 0 && <ul
        className="max-w-md text-xl space-y-1 text-center text-green-400 list-decimal list-inside dark:text-green-400"
      >
        {LeaderboardList}
      </ul>}
      {!leaderboardData.length && <p className="text-center">No attempts</p>}

      <Link to={"/"} className="block mt-10 text-center text-blue-300">New game</Link>
    </Card >
  );
};

export default Leaderboard;