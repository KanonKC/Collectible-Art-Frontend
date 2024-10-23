import { TwitchUserAuthorization } from "@/types/Twitch.type";
import axios, { AxiosResponse } from "axios";

const { VITE_TWITCH_CLIENT_ID, VITE_TWITCH_CLIENT_SECRET, VITE_FRONTEND_URL } =
	import.meta.env;

export async function getUserLoginAccessToken(
	code: string
): Promise<AxiosResponse<TwitchUserAuthorization>> {
	const authOptions = {
		url: "https://id.twitch.tv/oauth2/token",
		form: {
			code: code,
			client_id: VITE_TWITCH_CLIENT_ID,
			client_secret: VITE_TWITCH_CLIENT_SECRET,
			redirect_uri: `${VITE_FRONTEND_URL}/auth/twitch`,
			grant_type: "authorization_code",
		},
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		json: true,
	};

	return axios.post(authOptions.url, authOptions.form, {
		headers: authOptions.headers,
	});
}
