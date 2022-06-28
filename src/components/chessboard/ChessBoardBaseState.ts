import autobind from 'autobind-decorator'
import {Config} from 'chessground/src/config';

const Chess = require('chess.js');

export type Orientation = 'white' | 'black';

export interface IChessBoardState {
  fen: string;
  game: any;
  config: Config;
  promotions: Array<any>;
  promoteTo: string;
  board: any;
  isPromotion: (orig: string, dest: string) => boolean;
  toColor: () => Orientation;
  possibleMoves: () => Map<any, any>;
}

const colorArrowBrush = '#FFC83B';
const defBrushAttack = {key: 'y', color: colorArrowBrush, opacity: 1, lineWidth: 10}

export class ChessBoardBaseState implements IChessBoardState {
  protected __fen;
  protected __game;
  protected __board = null;
  protected __promotions: Array<any>;
  protected __promoteTo: string;
  protected __config: Config;

  constructor(fen: string) {
    this.__fen = fen;
    this.__game = new Chess();
    this.__promotions = [];
    this.__promoteTo = 'q'
    this.__config = {
      coordinates: true,
      fen: this.fen,
      turnColor: this.toColor(),
      movable: {
        color: this.toColor(),
        free: false,
        dests: this.possibleMoves(),
        showDests: true
      },
      drawable: {
        enabled: true,
        visible: true,
        brushes: {
          yellow: defBrushAttack
        }
      },
      orientation: 'white'
    } as Config;
  }

  public get fen(): string {
    return this.__fen;
  }

  public get board(): any {
    return this.__board;
  }

  public set board(newBoard: any) {
    this.__board = newBoard;
  }

  public get game(): any {
    return this.__game;
  }

  public get promotions(): Array<any> {
    return this.__promotions;
  }

  public set promotions(newPromotions: Array<any>) {
    this.__promotions = newPromotions;
  }

  public get promoteTo(): string {
    return this.__promoteTo;
  }

  public set promoteTo(newPromoteTo: string) {
    this.__promoteTo = newPromoteTo;
  }

  public set fen(newFen: string) {
    this.__fen = newFen;
  }

  public get config(): Config {
    return this.__config;
  }

  public set config(newConfig: Config) {
    this.__config = newConfig;
  }

  public loadFen(): void {
    this.__game.load(this.__fen);
  }

  @autobind
  public toColor(): Orientation {
    return this.game.turn() === 'w' ? 'white' : 'black';
  }

  @autobind
  public possibleMoves () {
    const dests = new Map()
    this.game.SQUARES.forEach(s => {
      const ms = this.game.moves({ square: s, verbose: true })
      if (ms.length) dests.set(s, ms.map(m => m.to))
    })
    return dests
  }

  @autobind
  public isPromotion (orig, dest) {
    const filteredPromotions = this.promotions.filter(move => move.from === orig && move.to === dest)
    return filteredPromotions.length > 0 // The current movement is a promotion
  }
}
