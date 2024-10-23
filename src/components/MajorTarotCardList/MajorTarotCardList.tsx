import { useEffect, useState } from "react";
import TarotCard from "../TarotCard/TarotCard";
import "./MajorTarotCardList.css";

const MajorTarotCardList = ({
	startCardNumber,
	endCardNumber,
}: {
	startCardNumber: number;
	endCardNumber: number;
}) => {
	const [audio, setAudio] = useState<HTMLAudioElement>(new Audio());

	const onClickTarotCard = (number: number) => {
		audio.pause();
		setAudio(
			new Audio(
				`http://localhost:8082/public/sounds/tarot-voices/normalized/${number}.mp3`
			)
		);
	};

	useEffect(() => {
		audio.play();
	}, [audio]);

	const majorCards = Array.from(
		{ length: endCardNumber + 1 },
		(_, i) => i
	).slice(startCardNumber, endCardNumber + 1);

	return (
		<div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
			{majorCards.map((number) => (
				<TarotCard
					key={number}
					cardNumber={number}
					onClickTarotCard={onClickTarotCard}
				/>
			))}
		</div>
	);
};

export default MajorTarotCardList;
