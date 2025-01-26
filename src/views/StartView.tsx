import type { FC } from "react";
import { useNavigate } from "react-router";
import { Card } from 'primereact/card';
import { Button } from "primereact/button";

const StartView: FC = () => {

  const navigate = useNavigate();

  const playHandle = () => {
    navigate("/game");
  }

  return (
    <>
      <Card title="Guess the cards" className="flex text-center flex-col m-auto w-full max-w-sm md:max-w-xl rounded shadow-xl p-4 overflow-auto">
        <Button onClick={playHandle} className="bg-transparent cursor-pointer hover:bg-blue-300 text-blue-300 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Play
        </Button>
      </Card >
    </>
  );
};

export default StartView;