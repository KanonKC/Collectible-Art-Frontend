import { cn } from "@/lib/utils";
import TarotCardDialog from "../TarotCardDialog/TarotCardDialog";
import { Card, CardContent } from "../ui/card";
import "./TarotCard.css";
import { useAppSelector } from "@/stores/hooks";

const TarotCard = ({
	cardNumber,
}: {
	cardNumber: number;
}) => {

    const tarotCard = useAppSelector(state => state.tarotCard.majorCards.find(card => card.id === cardNumber));

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
					<div className={cn({
                        'opacity-0': tarotCard?.isUnlocked
                    }, "tarot-card-shadow-box")}></div>
				</Card>
			</div>
		</TarotCardDialog>
	);
};

export default TarotCard;
