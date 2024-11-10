import Navbar from "@/layouts/Navbar/Navbar";
import "./PixelArtPage.css";
import PixelArtDrawingPannel from "@/components/PixelArtDrawingPannel/PixelArtDrawingPannel";
import { Dotting, useBrush } from "dotting";

const PixelArtPage = () => {

	return (
		<Navbar>
			<div className="flex justify-center">
				<PixelArtDrawingPannel />
			</div>
		</Navbar>
	);
};

export default PixelArtPage;
