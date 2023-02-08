import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { ChatRooms, RoomAccess, RoomStatus } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { UserDto } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';
import { ChatService } from './chat.service';
import { chatMsgDto } from './dtos/chatMsg.dto';
import { MsgService } from './msg/msg.service';
import { RoomService } from './room/room.service';
import { chatRoomDto } from './dtos/chatRoom.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GameService } from 'src/game/game.service';
import { MatchMakerQueue } from 'src/utils/MatchMakerQueue';
import { safeStringify } from 'src/utils/serialization';
import { GameState } from 'src/game/Core/game';
import { MoveStat, SocketGamePlayerMoveData } from 'src/utils/GameEnums';
import { APlayer } from 'src/game/Core/Players/APlayer';
import { Player } from 'src/game/Core/Players/player';

export class mySocket extends Socket {
    user?: UserDto;
}

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
    namespace: 'chat',
})
@UsePipes(
    new ValidationPipe({
        whitelist: true,
    }),
)
export class ChatGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    matchMaker = new MatchMakerQueue<number>();

    constructor(
        private roomService: RoomService,
        private msgService: MsgService,
        private chatService: ChatService,
        private userService: UserService,
        private prismaService: PrismaService,
        private readonly gameService: GameService,
    ) { }

    @WebSocketServer()
    server: Server;

    afterInit() { }

    async getConnectedUsers(): Promise<UserDto[]> {
        const clients: any = await this.server.fetchSockets();
        return clients.map((ele: { user: UserDto }) => ele.user);
    }

    async handleConnection(socket: mySocket) {
        try {
            const userId = await this.chatService.getUserFromsocket(socket);
            socket.emit('me', await this.userService.getUser(userId));
            socket.emit(
                'users',
                await this.chatService.getUsers(
                    socket.user.id,
                    await this.getConnectedUsers(),
                ),
            );
            //socket.emit('users', await this.userService.getUsers(userId));
            socket.emit('rooms', await this.chatService.getRooms(socket));
            socket.emit('dMRooms', await this.chatService.getDMRooms(socket));
            socket.emit('friends', await this.chatService.getFriends(userId));
            socket.emit('challenges', await this.gameService.getChallenges(userId));
            this.chatService.status_broadcast(socket);
        } catch (err) {
            socket.disconnect(true);
        }
        // get users with the status
    }

    @SubscribeMessage('directMsg')
    async handleDirectMsg(
        @ConnectedSocket() client: mySocket,
        @MessageBody() payload: chatMsgDto,
    ) {
        // payload.roomId === user2id 'this is a tmp solution until creating a new chatmsgDto'
        const exist = await this.prismaService.chatRooms.findFirst({
            where: {
                name: '',
                RoomUsers: {
                    some: {
                        AND: [{ userId: client.user.id }, { userId: payload.roomId }],
                    },
                },
            },
        });
        if (exist) throw new WsException('Ambiguous credentials go home');
        const room = await this.roomService.createDirectMsgRoom(
            client.user.id,
            payload.roomId,
        );
        const user1 = await this.userService.getUser(client.user.id);
        const user2 = await this.userService.getUser(payload.roomId);
        client.join(`room${room.id}`);
        this.server.in(`${payload.roomId}`).socketsJoin(`room${room.id}`);
        client.emit('addRoom', {
            id: room.id,
            name: user2.login,
            isGroupChat: false,
        });
        this.server
            .in(`${payload.roomId}`)
            .emit('addRoom', { id: room.id, name: user1.login, isGroupChat: false });
        const msg = await this.msgService.addMsg({
            roomId: room.id,
            userId: client.user.id,
            msg: payload.msg,
        });
        this.server.in(`room${msg.roomId}`).emit('chatMsg', msg);
    }

    @SubscribeMessage('chatMsg')
    async handleMessage(
        @ConnectedSocket() client: mySocket,
        @MessageBody() payload: chatMsgDto,
    ) {
        payload.userId = client.user.id;
        const msg = await this.msgService.addMsg(payload);
        this.server.in(`room${msg.roomId}`).emit('chatMsg', msg);
    }

    @SubscribeMessage('addRoom')
    async addRoom(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: chatRoomDto,
    ) {
        try {
            const room = await this.roomService.createRoom(payload, socket.user.id);
            socket.join(`room${room.id}`);
            socket.emit('addRoom', room);
        } catch (error) {
            socket.emit('error', error.message);
        }
    }

    @SubscribeMessage('deleteRoom')
    async deleteRoom(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: chatRoomDto,
    ) {
        try {
            payload.status = RoomStatus.Deleted;
            const room = await this.roomService.updateRoom(payload, socket.user.id);
            this.server.in(`room${room.id}`).emit('deleteRoom', room);
            this.server.socketsLeave(String(room.id));
        } catch (error) {
            socket.emit('error', error.message);
        }
    }

    @SubscribeMessage('updateRoom')
    async updateRoom(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: ChatRooms,
    ) {
        try {
            const room = await this.roomService.updateRoom(payload, socket.user.id);
            this.server.in(`room${room.id}`).emit('updateRoom', room);
        } catch (error) {
            socket.emit('error', error.message);
        }
    }

    @SubscribeMessage('isOnline')
    async isOnline(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() isOnline: boolean,
    ) {
        socket.user.isOnline = isOnline;
        this.chatService.status_broadcast(socket);
    }

    @SubscribeMessage('addFriend')
    async addFriend(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() friendId: number,
    ) {
        const friend = await this.userService.addFriend(socket.user.id, friendId);
        this.server.in(String(friendId)).emit('addFriend', friend);
        socket.emit('addFriend', friend);
    }

    @SubscribeMessage('removeFriend')
    async removeFriend(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() friendId: number,
    ) {
        const friend = await this.userService.removeFriend(
            socket.user.id,
            friendId,
        );
        this.server.in(String(friendId)).emit('removeFriend', friend);
        socket.emit('removeFriend', friend);
    }

    @SubscribeMessage('acceptFriend')
    async acceptFriend(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() friendId: number,
    ) {
        const friend = await this.userService.acceptFriend(
            socket.user.id,
            friendId,
        );
        this.server.in(String(friendId)).emit('acceptFriend', friend);
        socket.emit('acceptFriend', friend);
    }

    @SubscribeMessage('mute')
    async mute(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: { userId: number; roomId: number; value: boolean },
    ) {
        const ret = await this.roomService.muteUser(
            socket.user.id,
            payload.roomId,
            payload.userId,
            payload.value,
        );
        if (ret) {
            this.server.in(`room${payload.roomId}`).emit('mute', {
                userId: ret.userId,
                roomId: ret.roomId,
                val: payload.value,
            });
        }
    }

    @SubscribeMessage('ban')
    async ban(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: { userId: number; roomId: number; value: boolean },
    ) {
        const ret = await this.roomService.banUser(
            socket.user.id,
            payload.roomId,
            payload.userId,
            payload.value,
        );
        if (ret) {
            if (!payload.value)
                this.server
                    .in(String(payload.userId))
                    .socketsJoin(`room${payload.roomId}`);
            else
                this.server
                    .in(String(payload.userId))
                    .socketsLeave(`room${payload.roomId}`);

            this.server.in(`room${payload.roomId}`).emit('ban', {
                userId: ret.userId,
                roomId: ret.roomId,
                val: payload.value,
            });
        }
    }

    @SubscribeMessage('role')
    async admin(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: { userId: number; roomId: number; role: string },
    ) {
        const ret = await this.roomService.role(
            socket.user.id,
            payload.roomId,
            payload.userId,
            payload.role,
        );
        this.server.in(`room${payload.roomId}`).emit('role', {
            userId: ret.userId,
            roomId: ret.roomId,
            role: ret.role,
        });
    }
    @SubscribeMessage('searchs')
    async searchs(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: string,
    ) {
        const user = await this.prismaService.user.findFirst({
            where: {
                login: {
                    startsWith: payload,
                },
            },
            select: {
                id: true,
                login: true,
                imageUrl: true,
            },
        });
        if (user) socket.emit('searchs', user);
        else {
            const room = await this.prismaService.chatRooms.findFirst({
                where: {
                    name: {
                        startsWith: payload,
                    },
                    NOT: {
                        OR: [
                            { access: RoomAccess.Private },
                            { status: RoomStatus.Deleted },
                        ],
                    },
                },
                select: {
                    id: true,
                    name: true,
                    access: true,
                },
            });
            if (room) socket.emit('searchs', room);
        }
    }

    @SubscribeMessage('joinRoom')
    async joinRooom(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: { roomId: number; password?: string },
    ) {
        const roomUser = await this.roomService.joinRoom(
            socket.user.id,
            payload.roomId,
            payload.password,
        );
        const user = await this.userService.getUser(roomUser.userId);
        socket.join(`room${roomUser.roomId}`);
        socket.emit('addRoom', await this.roomService.getRoom(roomUser.roomId));
        this.server
            .in(`room${roomUser.roomId}`)
            .emit('joinRoom', { roomId: roomUser.roomId, user });
    }

    @SubscribeMessage('leaveRoom')
    async leaveRooom(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: { roomId: number },
    ) {
        await this.roomService.leaveRoom(socket.user.id, payload.roomId);
        this.server
            .in(`room${payload.roomId}`)
            .emit('leaveRoom', { roomId: payload.roomId, userId: socket.user.id });
        socket.leave(`room${payload.roomId}`);
    }

    @SubscribeMessage('challenge')
    async handleChallenge(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() payload: any,
    ) {
        const challenge = await this.gameService.challenge(socket.user.id, payload);
        if (!challenge) return new WsException('Ambiguous credentials');
        socket.emit('challenge', challenge);
        this.server.in(`${payload.challengedId}`).emit('challenge', challenge);
    }

    @SubscribeMessage('cancelChallenge')
    async handleCancelChallenge(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() challengedId: any,
    ) {
        const challenge = await this.gameService.deleteChallenge(
            socket.user.id,
            challengedId,
        );
        if (!challenge) return new WsException('Ambiguous credentials');
        socket.emit('cancelChallenge', challenge);
        this.server.in(`${challengedId}`).emit('cancelChallenge', challenge);
    }

    @SubscribeMessage('declineChallenge')
    async handleDeclineChallenge(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() challengerId: number,
    ) {
        const challenge = await this.gameService.deleteChallenge(
            challengerId,
            socket.user.id,
        );
        if (!challenge) return new WsException('Ambiguous credentials');
        socket.emit('declineChallenge', challenge);
        this.server.in(`${challengerId}`).emit('declineChallenge', challenge);
    }

    @SubscribeMessage('acceptChallenge')
    async handleAcceptChallenge(
        @ConnectedSocket() socket: mySocket,
        @MessageBody() challengerId: number,
    ) {
        // if all user are online  create a game
        socket.user.inGame = true;
        this.server
            .in([...socket.rooms])
            .emit('inGame', { id: socket.user.id, inGame: true });
        const opponent: any = await this.server
            .in(`${challengerId}`)
            .fetchSockets();
        opponent[0].user.inGame = true;
        this.server
            .in([...opponent[0].rooms])
            .emit('inGame', { id: challengerId, ingame: true });

        // set in game status to true
        // join sockets
        //start a counter 15s
        //send the game with are you readdy
        //
        //    socket.emit('areYouReady', {})
    }

    @SubscribeMessage('quickPairing')
    async handleQuickPairing(@ConnectedSocket() socket: mySocket) {
        this.matchMaker.subscribe(Number(socket.user.id));
        const pairing = this.matchMaker.pairing();
        if (pairing) {
            console.log(pairing);
            socket.user.inGame = true;
            this.server.in([...socket.rooms]).emit('inGame', { id: socket.user.id, inGame: true });
            const opponent: any = await this.server.in(`${pairing[0]}`).fetchSockets();
            this.server
            .in([...opponent[0].rooms])
            .emit('inGame', { id: pairing[0], ingame: true });
            opponent[0].user.inGame = true;
            const game = this.gameService.newSimpleGame([socket, opponent[0]])
            await opponent[0].join("Game0")
            await socket.join("Game0")
            game.subscribeWebClient((data: GameState) => {
                this.server.in("Game0").emit('gameDataUpdate', data)
            })
            setTimeout(() => {game.start()}, 3000)
        }
        //  else
        //  socket.emit('waitAGame');
    }

    @SubscribeMessage('getGameData')
    async getGameData(@ConnectedSocket() socket: mySocket) {
        console.log(this.gameService.getGame(0).players);
        const id1 = this.gameService.getGame(0).players[0].id
        const id2 = this.gameService.getGame(0).players[1].id
        const user1 = await this.userService.getUser(id1)
        const user2 = await this.userService.getUser(id2)
        const data = {
            //get the user data from the socket by the player id
            playersData : this.gameService.getGame(0).players.map(p => {return {id : p.id}}),
            players: this.gameService.getGame(0).players.map(p => p.body),
            obstacles: this.gameService.getGame(0).obstacles,
            ball: this.gameService.getGame(0).ball,
            gameSize: this.gameService.getGame(0).size,
            usersOfPlayers: [user1, user2]
        }
        socket.emit("gameData", safeStringify(data))
    }

    @SubscribeMessage('cancelQuickPairing')
    async handleCancelQuickPairing(@ConnectedSocket() socket: mySocket) {
        this.matchMaker.cancel(Number(socket.id));
        //  socket.emit('notInGame');
    }

    @SubscribeMessage('gamePlayerMove')
    async GamePlayerMove(@ConnectedSocket() socket: mySocket,
        @MessageBody() move: SocketGamePlayerMoveData,) {
        this.matchMaker.cancel(Number(socket.id));

        const player: APlayer = this.gameService.getGame(0).get_player_by_id(socket.user.id)
        if (player) {
            if (move.action === MoveStat.Start) {
                console.log("player try to move", player.id);
                (player as Player).start_moving(move.direction);
            }
            else if (move.action === MoveStat.Stop)
                (player as Player).stop_moving();
        }
    }

    handleDisconnect(@ConnectedSocket() socket: mySocket) {
        if (socket.user)
            socket.broadcast
                .to([...socket.rooms])
                .emit('isOnline', { userId: socket.user.id, status: false });
    }
}
