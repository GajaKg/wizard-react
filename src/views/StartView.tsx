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
      <Card title="Guess the cards" className="flex items-center justify-center flex-col m-auto w-full max-w-sm md:max-w-xl rounded shadow-xl p-4 overflow-auto">
        <Button onClick={playHandle}>
          Play
        </Button>
      </Card >
    </>
  );
};

export default StartView;