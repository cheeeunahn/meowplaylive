export type ChatType =
    // Donation = 0.
    'DefaultChat'
    // Donation > 0.
    | 'SuperChat'
    // Spechal chat which means 'joining the network'.
    | 'JoinChat';

export interface Chat {
    profileColor: string;
    nickname: string;
    content: string;
    donation: number;
    timestamp: number;
    type: ChatType;
}
