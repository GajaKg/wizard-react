import type { FC } from "react";

interface Props {
    cardType: "s" | "h" | "d" | "c";
    children: React.ReactNode;
}

const CardBox: FC<Props> = ({ cardType, children }: Props) => {

    const typesCard = {
        "s": "spades.png",
        "h": "hearts.png",
        "d": "diamond.png",
        "c": "clubs.png",
    }

    const typeImg = `src/assets/icons/${typesCard[cardType]}`;
    
    return (
        <>
            <div className="relative w-20 h-32 md:h-42 border rounded-lg border-gray-500 bg-gray-50">
                <div className="absolute top-2 right-4 w-5">
                    <img src={typeImg} className="w-full h-auto" /></div>
                <div className="grid h-full justify-center content-center text-black">
                    <p className="text-2xl">{children}</p>
                </div>
            </div>
        </>
    );
};

export default CardBox;