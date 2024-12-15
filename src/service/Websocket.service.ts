import { baseUrl } from ".";

export async function createChannelChatMessageEventWorkflow(accountId: string) {
    return baseUrl.post(`/websockets/channel-chat-message/${accountId}`);
}