import { ChannelPointRedeem } from "@/types/ChannelPointRedeem.type";
import { baseUrl } from ".";

export async function getRedeemableChannelPointAmount(twitchUserId: string) {
	return baseUrl.get<{ amount: number }>(
		"/channel-point-redeem/redeemable-point",
		{
			params: {
				twitchUserId,
			},
		}
	);
}

export async function getRedeemableChannelPointAmountList(
	twitchUserId: string,
	customAmountList: number[]
) {
	return baseUrl.get<{
		amountList: {
			expectAmount: number;
			possibleAmount: number;
		}[];
	}>("/channel-point-redeem/redeemable-point-list", {
		params: {
			twitchUserId,
			customAmountList: customAmountList.join(","),
		},
	});
}

export async function redeemChannelPointFromCustomPoint(
	twitchUserId: string,
	amount: number
) {
	return baseUrl.get<ChannelPointRedeem>("/channel-point-redeem", {
		params: {
			twitchUserId,
			amount,
		},
	});
}
