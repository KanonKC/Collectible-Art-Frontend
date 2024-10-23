import { Card, CardContent } from "../ui/card";
import "./TarotCard.css";

const TarotCard = ({
	number,
	onClickTarotCard,
}: {
	number: number;
	onClickTarotCard: (number: number) => void;
}) => {
	return (
		<div
			className="tarot-card-container"
			onClick={() => onClickTarotCard(number)}
		>
			<Card className="tarot-card">
				<CardContent className="p-1">
					<img
						key={number}
						width={150}
						src={`images/${number}.png`}
					/>
				</CardContent>
			    <div className="tarot-card-shadow-box"></div>
			</Card>
		</div>
	);
};

export default TarotCard;
