import { CustomPoint } from "@/types/CustomPoint.type";
import { baseUrl } from ".";

export async function getCustomPoint(twitchUserId: string) {
	return baseUrl.get<CustomPoint>(`/custom-point/${twitchUserId}`);
}
