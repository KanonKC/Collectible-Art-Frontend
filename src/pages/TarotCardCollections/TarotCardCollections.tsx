import MajorTarotCardListCarousel from "@/components/MajorTarotCardListCarousel/MajorTarotCardListCarousel";
import Navbar from "@/layouts/Navbar/Navbar";
import { useAppSelector } from "@/stores/hooks";
import { loadTarotCardsCollection } from "@/stores/slices/tarotCardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./TarotCardCollections.css";
import TarotCardCounterCard from "@/components/TarotCardCounterCard/TarotCardCounterCard";

const TarotCardCollections = () => {
	const account = useAppSelector((state) => state.account);
	const dispatch = useDispatch();

	useEffect(() => {
		if (account.twitchId) {
			loadTarotCardsCollection(dispatch, account.twitchId);
		}
	}, [account, dispatch]);

	return (
		<Navbar>
            <div className="absolute right-0 m-2 md:right-0 md:m-4 z-50">
                <TarotCardCounterCard />
            </div>
			<div className="flex justify-center items-center md:h-[90vh]">
				<div className="max-w-[70%] min-w-[50%]">
					<MajorTarotCardListCarousel />
				</div>
			</div>
		</Navbar>
	);
};

export default TarotCardCollections;
