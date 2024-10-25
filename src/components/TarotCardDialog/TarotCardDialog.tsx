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
import { Lock } from "lucide-react"

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
    const [currentlyPlayingIndex, setCurrentPlayingIndex] = useState<number>(-1);

    const onClickPlaySound = (sound: TarotCardSoundProfile, index: number) => {
        if (audio) {
            audio.pause();
        }
        try {
            setAudio(new Audio(sound.soundUrl!));
        }
        catch (error) {
            console.error(error);
            setAudio(new Audio(`tarot-voices/${sound.filename}`));
        }
        setCurrentPlayingIndex(index);
    }

    const onDialogClose = () => {
        if (audio) {
            audio.pause();
        }
        setCurrentPlayingIndex(-1);
    }

    useEffect(() => {
        if (audio) {
            audio.play();
        }
    }, [audio]);

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
							<div className="voice-actor-profile-content">
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

								<div className="grid grid-cols-3 gap-[4px] md:grid-cols-6">
									{tarotCard?.sounds.map((sound, index) => (
										<Button
                                            onClick={() => onClickPlaySound(sound, index)}
											key={index}
											variant={currentlyPlayingIndex === index ? "default" : "outline"}
                                            className={cn({
                                                "bg-secondary": !sound.isUnlocked,
                                            })}
											disabled={!sound.isUnlocked}
										>
											{sound.isUnlocked ? (<span>{index + 1}</span>) : <span><Lock size={14} /></span>}
										</Button>
									))}
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
