import type { FC } from "react";

interface Props {
    setup: string;
    punchline: string;
}

const JokeShow: FC<Props> = ({ setup, punchline }: Props) => {
    return (
        <div className="mt-6">
            <div className="italic underline text-center cursor-pointer">
                {setup}
            </div>
            <div className="text-center cursor-pointer">
                {punchline}
            </div>
        </div>
    );
};

export default JokeShow;