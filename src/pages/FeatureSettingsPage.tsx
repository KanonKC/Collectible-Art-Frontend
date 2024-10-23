import ShoutoutWithClipSettings from "@/components/ShoutoutWithClipSettings/ShoutoutWithClipSettings";
import ShowAnImageSettings from "@/components/ShowAnImageSettings/ShowAnImageSettings";
import TarotCardSettings from "@/components/TarotCardSettings/TarotCardSettings";
import Navbar from "@/layouts/Navbar/Navbar";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const FeatureSettingsPage = () => {
	const { feature } = useParams();

    useEffect(() => {
        console.log(feature)
    }, [feature])

	return (
		<div>
			<Navbar>
                <div className="mx-10 mt-10 pb-10">
                    { feature === 'shoutout-with-clip' && <ShoutoutWithClipSettings />}
                    { feature === 'show-an-image' && <ShowAnImageSettings />}
                    { feature === 'tarot-card' && <TarotCardSettings />}
                </div>
			</Navbar>
		</div>
	);
};

export default FeatureSettingsPage;
