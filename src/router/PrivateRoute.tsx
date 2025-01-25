/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GameView from "../views/GameView";
import LeaderboardView from "../views/LeaderboardView.tsx";
import StartView from "../views/StartView.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <StartView></StartView>,
      },
      {
        path: "/game",
        element: <GameView></GameView>,
      },
      {
        path: "/leaderboard",
        element: <LeaderboardView></LeaderboardView>,
      },
    ]
  },

]);
