import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TarotCardCollections from "./pages/TarotCardCollections/TarotCardCollections";
import TwitchLoginRedirectPage from "./pages/TwitchLoginRedirectPage";
import { useAppDispatch, useAppSelector } from "./stores/hooks";
import { useEffect } from "react";
import PixelArtPage from "./pages/PixelArtPage/PixelArtPage";
import MathGamePage from "./pages/MathGamePage/MathGamePage";
import RedeemChannelPoints from "./pages/RedeemChannelPoints/RedeemChannelPoints";
import LeaderboardsPage from "./pages/LeaderboardsPage/LeaderboardsPage";

const Router = () => {
	const dispatch = useAppDispatch();
	const account = useAppSelector((state) => state.account);

	useEffect(() => {
		if (account.accessToken) {
			if (
				new Date().getTime() >
				new Date(account.twitchTokenExpiresAt!).getTime()
			) {
				dispatch({ type: "account/logout" });
			}
		}
	}, [account, dispatch]);

	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/auth/twitch" element={<TwitchLoginRedirectPage />} />
			<Route
				path="/tarot-card-collections"
				element={<TarotCardCollections />}
			/>
			<Route path="/pixel-art" element={<PixelArtPage />} />
			<Route path="/math-game" element={<MathGamePage />} />
			<Route
				path="/redeem-channel-points"
				element={<RedeemChannelPoints />}
			/>
            <Route
                path="/leaderboards"
                element={<LeaderboardsPage />}
            />
		</Routes>
	);
};

export default Router;
