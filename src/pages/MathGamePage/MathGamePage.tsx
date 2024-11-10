import { Input } from "@/components/ui/input";
import Navbar from "@/layouts/Navbar/Navbar";
import "./MathGamePage.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createMathGame } from "@/utils/createMathGame";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, RotateCw } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";

const MathGamePage = () => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [score, setScore] = useState(0);
	const [totalAttmpets, setTotalAttempts] = useState(0);
	const [expression, setExpression] = useState("");
	const [answer, setAnswer] = useState(0);
	const [inputValue, setInputValue] = useState("");
	const [currentState, setCurrentState] = useState<
		"idle" | "correct" | "incorrect"
	>("idle");

	const createGame = () => {
		const game = createMathGame();
		setExpression(game.expression);
		setAnswer(game.answer);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	const handleSubmit = () => {
		if (parseInt(inputValue) === answer) {
			setCurrentState("correct");
			setScore(score + 1);
			createGame();
		} else {
			setCurrentState("incorrect");
            if (Math.random() < 0.25) {
                setIsOpenDialog(true);
            }
        }
		setInputValue("");
		setTotalAttempts(totalAttmpets + 1);
		setTimeout(() => {
			setCurrentState("idle");
		}, 250);
	};

	useEffect(() => {
		createGame();
	}, []);

	return (
		<Navbar>
			<Dialog open={isOpenDialog}>
				<DialogContent onClick={() => setIsOpenDialog(false)}>
                    <DialogTitle>
                        ดูรูปชีสเค้กเสริมพลัง เพื่อการคิดเลขที่ถูกต้องมากขึ้น
                    </DialogTitle>
					<DialogDescription>
						<img
							src="https://img2.pic.in.th/pic/20241110_131427.jpg"
							alt="cheesecake"
						/>
					</DialogDescription>
				</DialogContent>
			</Dialog>
			<div className="mt-[30vh]">
				<div className="flex justify-center">
					<Card
						className={cn(
							"min-w-[20%] px-[32px] pb-[32px] pt-[8px] border-[4px]",
							{
								"border-green-500": currentState === "correct",
								"border-red-500": currentState === "incorrect",
								"border-transparent": currentState === "idle",
							}
						)}
					>
						<div className="flex justify-between my-[4px] text-sm text-neutral-500">
							<div>Score: {score}</div>
						</div>
						<div className="my-[32px] text-center text-4xl">
							{expression}
						</div>
						<div className="flex gap-[4px]">
							<Input
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								type="text"
								placeholder="Enter your answer"
								onKeyDown={handleKeyDown}
							/>
							<Button onClick={handleSubmit}>
								<span className="hidden sm:block">Enter</span>
								<span className="sm:hidden">
									<ArrowRight size={16} />
								</span>
							</Button>
							<Button variant="outline" onClick={createGame}>
								<RotateCw size={16} />
							</Button>
						</div>
					</Card>
				</div>
			</div>
		</Navbar>
	);
};

export default MathGamePage;
