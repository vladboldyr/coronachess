<template>
  <div class="merida blue">
    <div ref="board" class="cg-board-wrap"></div>
  </div>
</template>

<script lang="ts">
import ChessBoard from 'components/chessboard/ChessBoard.vue';
import {Prop} from 'vue-property-decorator';
import {IChessBoardState, Orientation} from 'components/chessboard/ChessBoardBaseState';
import {ChessBoardCustomState} from 'components/chessboard/ChessBoardCustom/ChessBoardCustomState';
import {Chessground} from 'chessground';
import {Vue} from 'vue-class-component';

export type ChessBoardProps = {
  fen: string; // Fen binded to the chessboard
  free?: boolean; // free moves instead of legal moves
  showThreats?: boolean; // shows threats for current position and player
  onPromotion?: () => 'q';
  orientation?: Orientation; // black orientation instead of white
}

export class ChessBoardCustom extends Vue {
  @Prop({default: {fen: '', free: false, showThreats: false, onPromotion: () => 'q', orientation: 'white' }}) props!: ChessBoardProps;

  protected boardState: IChessBoardState;

  public board;

  created() {
    this.boardState = new ChessBoardCustomState(this.props.fen);
    this.init();
  }

  mounted() {
  }

  public init() {
    /* this.board = Chessground(this.$refs.board as HTMLElement, this.boardState.config);
    this.board.set({
      movable: { events: { after: this.changeTurn() } }
    }) */
  }

  /* changeTurn () {
    return (orig, dest, metadata) => {
      if (this.isPromotion(orig, dest)) {
        this.promoteTo = this.props.onPromotion()
      }

      this.boardState.game.move({ from: orig, to: dest, promotion: this.promoteTo }) // promote to queen for simplicity
      // to do
      // this.wrapper-board.state.drawable.shapes - здесь данные фигур
      this.board.set({
        fen: this.game.fen(),
        turnColor: this.toColor(),
        movable: {
          color: this.toColor(),
          dests: this.possibleMoves()
        }
      })
      this.calculatePromotions()
      this.afterMove();
    }
  } */
}
</script>
