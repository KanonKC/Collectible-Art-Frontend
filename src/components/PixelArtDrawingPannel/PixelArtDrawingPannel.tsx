import { useAppDispatch } from "@/stores/hooks";
import PixelArtDrawingGrid from "./PixelArtDrawingGrid/PixelArtDrawingGrid";

const PixelArtDrawingPannel = () => {
	const width = 21;
	const height = 21;

	// Create a 2D array of size width x height
	const widthArray = Array.from({ length: width }, () => 0);
	const heightArray = Array.from({ length: height }, () => 0);

	const dispatch = useAppDispatch();

	const setMouseDown = () => {
        console.log('onMouseDownPanel')
		// dispatch({ type: "pixelArt/setIsMouseDownOnPanel", payload: true });
	};

	const setMouseUp = () => {
        console.log('onMouseUpPanel')
		// dispatch({ type: "pixelArt/setIsMouseDownOnPanel", payload: false });
	};

	return (
		<div onMouseDown={setMouseDown} onMouseUp={setMouseUp} onMouseLeave={setMouseUp}>
			{heightArray.map((_, i) => (
				<div key={i} className="flex">
					{widthArray.map((_, j) => (
						<PixelArtDrawingGrid key={j} />
					))}
				</div>
			))}
		</div>
	);
};

export default PixelArtDrawingPannel;
