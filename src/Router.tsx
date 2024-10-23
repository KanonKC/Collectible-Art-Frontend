import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TarotCardCollections from './pages/TarotCardCollections';
import TwitchLoginRedirectPage from './pages/TwitchLoginRedirectPage';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/twitch" element={<TwitchLoginRedirectPage />} />
        <Route path="/tarot-card-collections" element={<TarotCardCollections />} />
    </Routes>
  )
}

export default Router