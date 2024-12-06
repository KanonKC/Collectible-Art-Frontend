import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/stores/hooks";
import { Layers, Play } from "lucide-react";
import { useMemo } from "react";

const TarotCardCounterCardContent = () => {
	const majorCards = useAppSelector((state) => state.tarotCard.majorCards);
	const unlockedMajorCards = useMemo(
		() => majorCards.filter((card) => card.isUnlocked),
		[majorCards]
	);
	const totalUnlockedMajorCards = useMemo(
		() => unlockedMajorCards.length,
		[unlockedMajorCards]
	);
	const totalUnlockedPercent = useMemo(
		() => (totalUnlockedMajorCards / 22) * 100,
		[totalUnlockedMajorCards]
	);
	const totalSounds = useMemo(
		() => majorCards.reduce((acc, card) => acc + card.sounds.length, 0),
		[majorCards]
	);
	const totalUnlockedSounds = useMemo(
		() =>
			unlockedMajorCards.reduce(
				(acc, card) =>
					acc +
					card.sounds.filter((sound) => sound.isUnlocked).length,
				0
			),
		[unlockedMajorCards]
	);
	const totalUnlockedSoundsPercent = useMemo(
		() => (totalUnlockedSounds / totalSounds) * 100,
		[totalUnlockedSounds, totalSounds]
	);
	return (
		<div className="">
			<div className="flex gap-2">
				<div className="pt-2">
					<Layers size={28} />
				</div>
				<div className="w-[100%] flex flex-col gap-1">
					<div className="text-sm flex justify-end">
						<span className="text-neutral-600 font-bold">
							{totalUnlockedMajorCards}/22
						</span>
					</div>
					<div>
						<Progress value={totalUnlockedPercent} />
					</div>
				</div>
			</div>
			<div className="flex gap-2">
				<div className="pt-2">
					<Play size={28} />
				</div>
				<div className="w-[100%] flex flex-col gap-1">
					<div className="text-sm flex justify-end">
						<span className="text-neutral-600 font-bold">
							{totalUnlockedSounds}/{totalSounds}
						</span>
					</div>
					<div>
						<Progress value={totalUnlockedSoundsPercent} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default TarotCardCounterCardContent;
