import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

const TarotCardDialog = ({
	children,
	cardNumber,
}: {
	children: React.ReactNode;
	cardNumber: number;
}) => {
	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="max-w-[1000px]">
				<DialogHeader>
					<DialogTitle>Card Title</DialogTitle>
				</DialogHeader>
				<div className="flex">
					<img
						className="border-2 rounded-md mr-[32px]"
						width={250}
						src={`images/${cardNumber}.png`}
					/>
					<div>
                        <p className="text-lg mb-[16px]">Voiced by <b>VoiceActorName</b></p>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing
							elit. Aliquid nobis perspiciatis deserunt eaque
							suscipit. Ea, ducimus maiores fugit veritatis ipsam
							perspiciatis! Distinctio possimus magnam, natus
							repudiandae eum quasi fugit provident necessitatibus
							non ipsum culpa quod fuga soluta esse, aliquid
							aperiam quo maxime tempora pariatur quaerat ipsa.
							Beatae ratione maiores illo.
						</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TarotCardDialog;
