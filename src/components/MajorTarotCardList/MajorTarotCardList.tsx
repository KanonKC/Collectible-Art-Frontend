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
		<div className="card-list-container">
			{majorCards.map((number) => (
				<TarotCard
					key={number}
					number={number}
					onClickTarotCard={onClickTarotCard}
				/>
			))}
		</div>
	);
};

export default MajorTarotCardList;
