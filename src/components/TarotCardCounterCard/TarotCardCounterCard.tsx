import { SquareLibrary } from "lucide-react";
import { Card, CardTitle } from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import TarotCardCounterCardContent from "./TarotCardCounterCardContent/TarotCardCounterCardContent";

const TarotCardCounterCard = () => {
	return (
		<div className="flex text-xl">
			<div className="hidden md:block">
				<Card className="p-4 flex flex-col gap-2">
                    <CardTitle>Progression</CardTitle>
					<div className="w-[250px]">
						<TarotCardCounterCardContent />
					</div>
				</Card>
			</div>
			<div className="md:hidden">
				<Dialog>
					<DialogTrigger>
						<Card className="p-2 flex flex-col gap-2">
							<SquareLibrary size={32} />
						</Card>
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Progression</DialogTitle>
						<div className="">
							<TarotCardCounterCardContent />
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
};

export default TarotCardCounterCard;
