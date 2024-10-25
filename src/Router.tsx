import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TarotCardCollections from "./pages/TarotCardCollections";
import TwitchLoginRedirectPage from "./pages/TwitchLoginRedirectPage";
import { useAppDispatch, useAppSelector } from "./stores/hooks";
import { useEffect } from "react";

const Router = () => {
	
    const dispatch = useAppDispatch();
    const account = useAppSelector(state => state.account);

    useEffect(() => {
        if (account.accessToken) {
            if (new Date().getTime() > new Date(account.twitchTokenExpiresAt!).getTime()) {
                dispatch({ type: 'account/logout' })
            }
        }
    }, [account, dispatch])
    
    return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/auth/twitch" element={<TwitchLoginRedirectPage />} />
			<Route
				path="/tarot-card-collections"
				element={<TarotCardCollections />}
			/>
		</Routes>
	);
};

export default Router;
