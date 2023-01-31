import { Injectable } from '@nestjs/common';
import { Bodies, Vector } from 'matter-js';
import { mySocket } from 'src/chat/chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { Game, GameState } from './Core/game';
import { APlayer } from './Core/Players/APlayer';
import { Player } from './Core/Players/player';

@Injectable()
export class GameService {
    games: Map<number, Game> = new Map<number, Game>; // use map instead
    constructor(private readonly prismaService: PrismaService) { }

    async getHistory(userId: number) {
        const ret = await this.prismaService.games.findMany({
            where: {
                OR: [{ redCornerId: userId }, { blueCornerId: userId }],
            },
            take: 10,
        });
        return ret;
    }

    async getOverview(userId: number) {
        const games = await this.prismaService.games.findMany({
            where: {
                OR: [{ redCornerId: userId }, { blueCornerId: userId }],
            },
        });
        const nbrOfGames: number = games.length;
        const nbrOfWins = games.filter(
            (ele: any) =>
                (userId === ele.redCornerId &&
                    ele.redCornerScore > ele.blueCornerScore) ||
                (userId === ele.blueCornerId &&
                    ele.blueCornerScore > ele.redCornerScore),
        ).length;
        console.log(nbrOfGames);
        console.log(nbrOfWins);
        return { Games: nbrOfGames, Wins: nbrOfWins };
    }

    async getChallenges(userId: number) {
        const ret = await this.prismaService.challenges.findMany({
            where: {
                OR: [{ challengedId: userId }, { challengerId: userId }],
            },
        });
        return ret;
    }

    async challenge(challengerId: number, challenge: any) {
        try {
            const ret = await this.prismaService.challenges.create({
                data: {
                    challengerId,
                    challengedId: challenge.challengedId,
                    map: challenge.map,
                },
            });
            return ret;
        } catch {
            return undefined;
        }
    }

    async deleteChallenge(challengerId: number, challengedId: number) {
        const ret = await this.prismaService.challenges.delete({
            where: {
                challengerId_challengedId: { challengerId, challengedId },
            },
        });
        return ret;
    }

    create_players(players: mySocket[], padelType: PadelType): APlayer[] {
       // create player by setting the id for each player and set the callback for sending data to the client
       // should create a padel factory and use it like that: PadelFactory.create(padelType): body
       return players.map(player => {
           const padel = Bodies.rectangle(0,0, 100, 300)
           const p =  new Player(padel, player.user.id)
           p.GameUpdateCallback = (state:GameState) => {
                player.emit("game_update", state)
            }
            return p
       })
    }

    newSimpleGame(players: mySocket[]) {
        this.newGame(players, PadelType.Simple, ArenaType.Simple);
    }

    newGame(players: mySocket[], padelType: PadelType, arenaType: ArenaType) {
        const gamePlayers = this.create_players(players, padelType);
        const game = new Game({
                        id:0,
                        ball:Bodies.circle(0,0, 10),
                        players: gamePlayers,
                        obstacles:[],
                        size: Vector.create(200, 500),
                        scale:1})
        this.games.set(game.id, game)
        game.ball
        game.subscribeGameEnd((game: Game)=> {
            // set the status and teh score to the database
            // remove the game from the map
            this.games.delete(game.id)
        })
    }
    getGame(id: number): Game | undefined{
        return this.games.get(id)
    }
}
