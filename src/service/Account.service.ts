import { Account } from "@/types/Account.type";
import { TwitchUserAuthorization } from "@/types/Twitch.type";
import { baseUrl } from ".";

export async function createOrUpdateAccount(payload: TwitchUserAuthorization) {
    return baseUrl.post<Account>("/accounts", payload)
}