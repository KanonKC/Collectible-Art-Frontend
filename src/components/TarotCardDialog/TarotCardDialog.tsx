import { cn } from "@/lib/utils";
import { useAppSelector } from "@/stores/hooks";
import { TarotCardSoundProfile } from "@/types/TarotCard.type";
import { Lock, Volume2, VolumeX } from "lucide-react";
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
import { Slider } from "../ui/slider";
import "./TarotCardDialog.css";

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
	const [isMuted, setIsMuted] = useState<boolean>(false);
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

	const onVolumeChange = (e: number[]) => {
		setCurrentVolume(e[0]);
		setIsMuted(false);
	};

	const onClickMute = () => {
		setIsMuted(true);
	};

	const onClickUnmute = () => {
		setIsMuted(false);
	};

	useEffect(() => {
		if (audio) {
			audio.muted = isMuted;
		}
	}, [isMuted, audio]);

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

							<div
								className={`voice-actor-profile-content flex-col md:flex-row`}
							>
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
											<b
												style={{
													color: tarotCard?.voiceActor
														.color,
												}}
											>
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
											style={
												currentlyPlayingIndex === index
													? {
															backgroundColor:
																tarotCard
																	?.voiceActor
																	.color,
													  }
													: {}
											}
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
												<span
													className={cn({
														"px-[3px]":
															currentlyPlayingIndex ===
															index,
														"px-[2px]":
															currentlyPlayingIndex !==
															index,
													})}
												>
													{index + 1}
												</span>
											) : (
												<span>
													<Lock size={14} />
												</span>
											)}
										</Button>
									))}
									<div className="w-[150px] flex items-center gap-[4px] audio-tool-block">
										<div className="cursor-pointer">
											{currentVolume === 0 || isMuted ? (
												<VolumeX
													onClick={onClickUnmute}
													className="text-gray-500"
													size={18}
												/>
											) : (
												<Volume2
													onClick={onClickMute}
													className="text-gray-500"
													size={18}
												/>
											)}
										</div>
										<div className="w-[100%] cursor-pointer">
											<Slider
                                                rangeStyle={{
                                                    backgroundColor: tarotCard?.voiceActor.color ?? "",
                                                }}
                                                trackStyle={{
                                                    backgroundColor: "#e0e0e0",
                                                }}
                                                thumbStyle={{
                                                    borderColor: tarotCard?.voiceActor.color ?? "",
                                                }}
												min={0}
												max={1}
												step={0.01}
												onValueChange={onVolumeChange}
												value={[
													isMuted ? 0 : currentVolume,
												]}
											/>
										</div>
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
