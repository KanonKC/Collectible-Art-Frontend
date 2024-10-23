import { generateRandomString } from "./generateRandomString";

export const TwitchOAuthScopes = [
    "channel:manage:predictions",
    "user:read:chat",
    "user:read:email",
]

const { VITE_FRONTEND_URL, VITE_TWITCH_CLIENT_ID } = import.meta.env;

export function createTwitchOAuthUrl() {
    const randomString = generateRandomString(16);
    return `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${VITE_TWITCH_CLIENT_ID}&redirect_uri=${VITE_FRONTEND_URL}/auth/twitch&scope=${TwitchOAuthScopes.join('%20')}&state=${randomString}`

}