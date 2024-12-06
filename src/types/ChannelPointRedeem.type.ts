import { CustomPoint } from "./CustomPoint.type";

export interface ChannelPointRedeem extends CustomPoint {
    redeemedChannelPoints: number;
    redeemableChannelPoints: number;
}