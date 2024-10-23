import MajorTarotCardListCarousel from "@/components/MajorTarotCardListCarousel/MajorTarotCardListCarousel";
import Navbar from "@/layouts/Navbar/Navbar";

const TarotCardCollections = () => {

	return (
		<Navbar>
			<div className="w-[60%] mx-auto mt-[32px]">
				<MajorTarotCardListCarousel />
			</div>
		</Navbar>
	);
};

export default TarotCardCollections;
