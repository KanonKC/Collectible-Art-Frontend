export interface TarotCardVoiceActor {
    twitchLogin: string;
    displayName: string;
    profileUrl: string;
    youtube: string | null;
    color: string;
}

export interface TarotCardSoundProfile {
    filename: string;
    voiceActor: string;
    voiceActorTwitchId: string;
    isUnlocked: boolean;
    soundUrl: string | null;
}

export interface TarotCard {
    id: number;
    name: string;
    description: string;
    isUnlocked: boolean;
    imageUrl: string;
    sounds: TarotCardSoundProfile[];
    voiceActor: TarotCardVoiceActor;
}

export interface TarotCardsCollection {
    majorCards: TarotCard[];
}