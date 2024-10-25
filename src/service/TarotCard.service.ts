import { baseUrl } from ".";

export async function getTarotCardCollections(accountId: string) {
    return baseUrl.get<TarotCardCollectionListAPIResponse>(`/tarot/${accountId}`);
}