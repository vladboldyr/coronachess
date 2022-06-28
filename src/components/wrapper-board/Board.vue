<template>
  <chessboard class="board-wrap" @onMove="onMove" :fen="fen" :props="propsChild" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import '../../css/board/board.css';
// import { Prop } from 'vue-property-decorator'
// import { CSSProperties } from 'vue'
import gql from 'graphql-tag'
import ChessBoard from 'components/chessboard/ChessBoard.vue';
import OldChessBoard from 'components/chessboard/OldChessBoard.vue';
import {ChessBoardCustom, ChessBoardProps} from 'components/chessboard/ChessBoardCustom/ChessBoardCustom.vue';
import {loadByIdPuzzle, loadPuzzle} from 'src/apollo/getFen';
import {ref, watch, reactive} from 'vue';

@Options({
  components: {
    chessboard: ChessBoard
  }
})
export default class Board extends Vue {
  // @Prop({ required: false, type: Object, default: {} }) style!: CSSProperties;

  /*  private get styles (): CSSProperties {
    const styles: CSSProperties = this.style || {}
    return styles
  } */

  private fen = ref('');
  private puzzle: object = { position: '' }

  created() {
    this.puzzle['position'] = loadByIdPuzzle();
    /* watch(puzzle, result => {
      this.puzzle['position'] = result; // .puzzle.position;
    }); */
  }

  get propsChild(): ChessBoardProps {
    const fen = this.puzzle['position'];
    return {
      fen,
      showThreats: false
    };
  }

  private onMove (data) {
    // console.log(this.appolo)
    console.log('onmove', data)
    // @ts-ignore
    window.Pusher?.instances[0]?.connection?.connection?.transport?.socket.send(JSON.stringify({
      event: 'event',
      channel: 'test',
      data: JSON.stringify(data.history)
    }))
  }

  get appolo() {
    return {
      apollo: {
        puzzle: {
          query: gql`
          query puzzleMethod($id: ID!) {
            puzzle(id: $id) {
              id
              name
              position
              solution
              tags {
               name_ru
              }
             }
            }`,
          variable: {
            id: 1367
          },
          result (result) {
            console.log('result =>', result);
          },
          update ({ allRes }) {
            console.log('allRes', allRes);
          }
        }
      }
    }
  }

  private listen () {
    // @ts-ignore
    this.$echo.channel('test').listen('.puzzle', (payload) => {
      if (payload && typeof payload.move !== 'undefined') {
        // payload.move;
      }
    })
  }
}
</script>
