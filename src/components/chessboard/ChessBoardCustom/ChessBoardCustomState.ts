import {ChessBoardBaseState} from 'components/chessboard/ChessBoardBaseState';

export class ChessBoardCustomState extends ChessBoardBaseState {
  constructor (fen: string) {
    super(fen);
    this.config = {
      turnColor: this.toColor(),
      movable: {
        color: this.toColor(),
        free: false,
        dests: this.possibleMoves(),
        showDests: true
      },
      ...this.config
    };
    this.loadFen();
  }
}
