import { Injectable } from '@nestjs/common';
import { Bodies, Vector } from 'matter-js';
import { mySocket } from 'src/chat/chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';
import { ArenaType, PadelType } from 'src/utils/GameEnums';
import { PadelFactory } from './Core/Factories/PadelFactory';
import { Game, GameState } from './Core/game';
import { APlayer, PlayerMove } from './Core/Players/APlayer';
import { Player } from './Core/Players/player';

@Injectable()
export class GameService {
  games: Map<number, Game> = new Map<number, Game>;
  constructor(private readonly prisma: PrismaService) {
    PadelFactory.loadMakers()
  }

  async getHistory(userId: number) {
    const ret = await this.prisma.games.findMany({
      where: {
        OR: [{ redCornerId: userId }, { blueCornerId: userId }],
      },
      take: 10,
    });
    return ret;
  }

  async getOverview(userId: number) {
    const games = await this.prisma.games.findMany({
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
    return { Games: nbrOfGames, Wins: nbrOfWins };
  }

  async getChallenges(userId: number) {
    const ret = await this.prisma.challenges.findMany({
      where: {
        OR: [{ challengedId: userId }, { challengerId: userId }],
      },
    });
    return ret;
  }

  async challenge(challengerId: number, challenge: any) {
    try {
      const ret = await this.prisma.challenges.create({
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
    const ret = await this.prisma.challenges.delete({
      where: {
        challengerId_challengedId: { challengerId, challengedId },
      },
    });
    return ret;
  }

  create_players(players: mySocket[], padelType: PadelType): APlayer[] {
    // create player by setting the id for each player and set the callback for sending data to the client
    // should create a padel factory and use it like that: PadelFactory.create(padelType): body
    return players.map((player, idx) => {
        const padel = PadelFactory.getPadel(PadelType.HalfCircle, idx == 0 ? PlayerMove.Left : PlayerMove.Right)
        console.log("player-socket", player.user)
        const p = new Player(padel, player.user.id)
        p.GameUpdateCallback = (state: GameState) => {
            player.emit("game_update", state)
        }
        return p
    })
}

  newSimpleGame(players: mySocket[]): Promise<Game> {
      return this.newGame(players, PadelType.Simple, ArenaType.Simple);
  }

  async newGame(players: mySocket[], padelType: PadelType, arenaType: ArenaType): Promise<Game> {
      const dbgame = await this.prisma.games.create({
          data: {
              blueCornerId: players[0].user.id,
              redCornerId: players[1].user.id,
              map: "",
          }
      })
      players.forEach(p => p.user.gameId = dbgame.id)
      const gamePlayers = this.create_players(players, padelType);
      const game = new Game({
          id: dbgame.id,
          ball: Bodies.circle(0, 0, 10),
          players: gamePlayers,
          obstacles: [],
          size: Vector.create(500, 500),
          scale: 1
      })
      this.games.set(game.id, game)
      // game.ball
      game.subscribeGameEnd((game: Game) => {
          // set the status and teh score to the database
          // remove the game from the map
          console.log("game score : ", game.score)
          this.prisma.games.update({
              where: { id: game.id },
              data: { blueCornerScore: game.score[0], redCornerScore: game.score[1] }
          }).then(() => undefined)
          this.games.delete(game.id)
      })
      return game
  }

  getGame(id: number): Game | undefined {
      return this.games.get(id)
  }
}
