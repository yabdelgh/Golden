import { Body, Vector } from "matter-js"
import { MoveStat, PlayerMove } from "./src/Utils/enums"
import { Player } from "./src/GameCore/Players/player"

export type Friend = {
    user1Id: number,
    user2Id: number,
    status: boolean,
}

export type Msg = {
    id: number,
    msg: string,
    userId: number,
    roomId: number,
    createdAt: string,
    updatedAt: string,
}

export type RoomUser = {
    userId: number,
    role?: string,
    ban?: boolean,
    mute?: boolean,
    status?: string
}

export type Room = {
    id: number,
    name: string,
    access: string,
    isGroupChat?: boolean,
    RoomUsers: RoomUser[],
    lastMsg?: string,
}

export type User = {
    id: number,
    login: string,
    email?: string,
    imageUrl?: string,
    isOnline: boolean,
    inGame: boolean
}

export type GameData = {
    gameSize: Vector
    players: Object[],
    obstacles: Object[],
    ball: Object,
}

export type GameState = {
    ball_velocity: Vector;
    ball: Vector;
    player1: Vector;
    player2: Vector;
}

export type GameBodies = {
    players:Body[];
    obstacles:Body[];
    ball:Body;
    gamePlayers: Player[];
}

export type SocketGamePlayerMoveData = {
    direcion: PlayerMove;
    action: MoveStat;
}