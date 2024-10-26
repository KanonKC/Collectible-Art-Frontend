import { cn } from "@/lib/utils";
import { useAppSelector } from "@/stores/hooks";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import "./TarotCardDialog.css";
import { TarotCardSoundProfile } from "@/types/TarotCard.type";
import { Lock, Speaker, Volume, Volume2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";

const TarotCardDialog = ({
	children,
	cardNumber,
}: {
	children: React.ReactNode;
	cardNumber: number;
}) => {
	const tarotCard = useAppSelector((state) =>
		state.tarotCard.majorCards.find((card) => card.id === cardNumber)
	);

	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [currentVolume, setCurrentVolume] = useState<number>(0.5);
	const [currentlyPlayingIndex, setCurrentPlayingIndex] =
		useState<number>(-1);

	const onClickPlaySound = (sound: TarotCardSoundProfile, index: number) => {
		if (audio) {
			audio.pause();
		}
		try {
			setAudio(new Audio(sound.soundUrl!));
		} catch (error) {
			console.error(error);
			setAudio(new Audio(`tarot-voices/${sound.filename}`));
		}
		setCurrentPlayingIndex(index);
	};

	const onDialogClose = () => {
		if (audio) {
			audio.pause();
		}
		setCurrentPlayingIndex(-1);
	};

	useEffect(() => {
		if (audio) {
			audio.play();
		}
	}, [audio]);

    useEffect(() => {
        if (audio) {
            audio.volume = currentVolume;
        }
    }, [currentVolume, audio]);

	return (
		<Dialog onOpenChange={onDialogClose}>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogContent className="max-w-[1000px]">
				<DialogHeader>
					<DialogTitle>{tarotCard?.name}</DialogTitle>
				</DialogHeader>
				<div className="flex">
					<img
						className="border-2 rounded-md mr-[32px] hidden md:block"
						width={250}
						src={`images/${cardNumber}.png`}
					/>
					<div className="w-[100%]">
						<fieldset className="voice-actor-profile">
							<legend className="ml-[4px] px-[4px] font-bold text-sm ">
								Voiced Actor
							</legend>

							<div className="voice-actor-profile-content flex-col md:flex-row">
								<div>
									<a
										href={`https://twitch.tv/${tarotCard?.voiceActor.twitchLogin}`}
									>
										<div className="flex items-center gap-[8px]">
											<Avatar>
												<AvatarImage
													src={
														tarotCard?.voiceActor
															.profileUrl
													}
												/>
												<AvatarFallback>
													{
														tarotCard?.voiceActor
															.displayName[0]
													}
												</AvatarFallback>
											</Avatar>
											<b>
												{
													tarotCard?.voiceActor
														.displayName
												}
											</b>
										</div>
									</a>
								</div>

								<div className="flex gap-[4px] mt-[12px] justify-end md:mt-0 items-center">
									{tarotCard?.sounds.map((sound, index) => (
										<Button
											onClick={() =>
												onClickPlaySound(sound, index)
											}
											key={index}
											variant={
												currentlyPlayingIndex === index
													? "default"
													: "outline"
											}
											className={cn({
												"bg-secondary":
													!sound.isUnlocked,
											})}
											disabled={!sound.isUnlocked}
										>
											{sound.isUnlocked ? (
												<span className={cn({
                                                    "px-[3px]" : currentlyPlayingIndex === index,
                                                    "px-[2px]" : currentlyPlayingIndex !== index,
                                                })}>{index + 1}</span>
											) : (
												<span>
													<Lock size={14} />
												</span>
											)}
										</Button>
									))}
									<div className="w-[100px] flex gap-[4px] audio-tool-block">
										<Volume2
											className="text-gray-500"
											size={18}
										/>
										<Slider
											min={0}
											max={1}
                                            step={0.01}
                                            onValueChange={(e) => setCurrentVolume(e[0])}
											value={[currentVolume]}
										/>
									</div>
								</div>
							</div>
						</fieldset>
						<p className="mt-[16px]">{tarotCard?.description}</p>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TarotCardDialog;
