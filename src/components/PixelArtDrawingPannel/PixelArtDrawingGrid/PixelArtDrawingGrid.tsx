import { useAppSelector } from "@/stores/hooks";
import "./PixelArtDrawingGrid.css";
import { useState } from "react";
const PixelArtDrawingGrid = () => {
	
    const selectedColor = useAppSelector(
		(state) => state.pixelArt.selectedColor
	);

    const isMouseDownOnPanel = useAppSelector(
		(state) => state.pixelArt.isMouseDownOnPanel
	); 

    const [currentColor, setCurrentColor] = useState("#ffffff");

	const onClickDrawingGrid = () => {
        setCurrentColor(selectedColor);
    };

    const onMouseEnterGrid = () => {
        console.log('onMouseEnterGrid', isMouseDownOnPanel)
        if (isMouseDownOnPanel) {
            setCurrentColor(selectedColor);
        }
    };

	return (
		<div
            style={{ backgroundColor: currentColor }}
			className="pixel-art-drawing-grid"
			onClick={onClickDrawingGrid}
            onMouseEnter={onMouseEnterGrid}
		></div>
	);
};

export default PixelArtDrawingGrid;
