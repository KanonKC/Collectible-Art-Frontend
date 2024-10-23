import TarotCardDialog from "../TarotCardDialog/TarotCardDialog";
import { Card, CardContent } from "../ui/card";
import "./TarotCard.css";

const TarotCard = ({
	cardNumber,
}: {
	cardNumber: number;
}) => {
	return (
		<TarotCardDialog cardNumber={cardNumber}>
			<div
				className="tarot-card-container"
			>
				<Card className="tarot-card">
					<CardContent className="p-1">
						<img
							key={cardNumber}
							width={200}
							src={`images/${cardNumber}.png`}
						/>
					</CardContent>
					<div className="tarot-card-shadow-box"></div>
				</Card>
			</div>
		</TarotCardDialog>
	);
};

export default TarotCard;
