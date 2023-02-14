import { PlayerMove } from "src/game/Core/Players/APlayer"

export enum PadelType {
    Simple,
    Khobza,
    HalfCircle,
    Triangular,
    Jebaniya,
}

export enum ArenaType {
    Simple,
    Crazy,
    Unpredictable,
}

export enum MoveStat {
    Start, Stop
}

export type SocketGamePlayerMoveData = {
    direction?: PlayerMove;
    action: MoveStat;
}