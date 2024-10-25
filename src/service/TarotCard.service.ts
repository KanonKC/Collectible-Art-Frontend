import { TarotCardsCollection } from "@/types/TarotCard.type";
import { baseUrl } from ".";

export async function getTarotCardsCollection(accountId: string) {
    return baseUrl.get<TarotCardsCollection>(`/tarot/${accountId}`);
}