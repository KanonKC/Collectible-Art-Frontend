import { ShoutoutWithClip, UpdateShoutoutWithClipSettingsPayload } from "@/types/ShoutoutWithClip.type";
import { baseUrl } from ".";

export function createShoutoutWithClipSettings(accountId: string) {
    return baseUrl.post<ShoutoutWithClip>(`/shoutout-with-clip/${accountId}/settings`);
}

export function getShoutoutWithClipSettings(accountId: string) {
    return baseUrl.get<ShoutoutWithClip>(`/shoutout-with-clip/${accountId}/settings`);
}

export function updateShoutoutWithClipSettings(accountId: string, data: UpdateShoutoutWithClipSettingsPayload) {
    return baseUrl.put<ShoutoutWithClip>(`/shoutout-with-clip/${accountId}/settings`, data);
}

export function enableShoutoutWithClip(accountId: string) {
    return baseUrl.post<ShoutoutWithClip>(`/shoutout-with-clip/${accountId}/settings/enable`);
}

export function disableShoutoutWithClip(accountId: string) {
    return baseUrl.post<ShoutoutWithClip>(`/shoutout-with-clip/${accountId}/settings/disable`);
}

export function deliverShoutoutWithClip(accountId: string) {
    return baseUrl.post<ShoutoutWithClip>(`/shoutout-with-clip/${accountId}/test`);
}