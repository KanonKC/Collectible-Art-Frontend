import { baseUrl } from ".";

export async function createChannelChatMessageEventWorkflow(accountId: string) {
    console.log('Creating channel chat message event workflow')
    return baseUrl.post(`/websockets/channel-chat-message/${accountId}`);
}