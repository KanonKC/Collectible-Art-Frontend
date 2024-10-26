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
			<div className="flex justify-center items-center md:h-[90vh]">
                <div className="max-w-[70%] min-w-[50%]">
                    <MajorTarotCardListCarousel />
                </div>
            </div>
		</Navbar>
	);
};

export default TarotCardCollections;
