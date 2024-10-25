import MajorTarotCardListCarousel from "@/components/MajorTarotCardListCarousel/MajorTarotCardListCarousel";
import Navbar from "@/layouts/Navbar/Navbar";
import { useAppSelector } from "@/stores/hooks";
import { loadTarotCardsCollection } from "@/stores/slices/tarotCardSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const TarotCardCollections = () => {

    const account = useAppSelector((state) => state.account)
    const dispatch = useDispatch()
    

    useEffect(() => {
        if (account.twitchId) {
            loadTarotCardsCollection(dispatch, account.twitchId)
        }
    }, [account, dispatch])

	return (
		<Navbar>
			<div className="w-[60%] mx-auto mt-[32px]">
				<MajorTarotCardListCarousel />
			</div>
		</Navbar>
	);
};

export default TarotCardCollections;
