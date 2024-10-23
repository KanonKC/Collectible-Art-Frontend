export interface ShoutoutWithClip {
    accountId: string;
    featuredClipPriority: boolean;
    isEnabled: boolean;
    key: string;
    createdAt: string;
    updatedAt: string;
}

export interface UpdateShoutoutWithClipSettingsPayload {
    featuredClipPriority: boolean
}