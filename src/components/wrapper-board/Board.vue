<template>
  <chessboard class="board-wrap" @onMove="onMove" :props="propsChild" />
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

  get propsChild(): ChessBoardProps {
    const fen = this.puzzle['position'];
    return {
      fen,
      showThreats: true
    };
  }

  private puzzle: object = { position: '' }
  private onMove (data) {
    console.log(this.appolo)
    console.log('onmove', data)
    // @ts-ignore
    window.Pusher?.instances[0]?.connection?.connection?.transport?.socket.send(JSON.stringify({
      event: 'event',
      channel: 'test',
      data: JSON.stringify(data.history)
    }))
  }

  /* data: [{
      c1: 'Ae2e4', c2: 159, c3: 6
    }, {
      c1: 'Be2e4', c2: 72, c3: 5
    }, {
      c1: 'Ce2e4', c2: 180, c3: 9
    }, {
      c1: 'De2e4', c2: 1, c3: 22
    }], */
  /* filter: '',
      puzzle: { position: '' },
      show_filter: false,
      columns: [{
        name: 'c1',
        required: true,
        label: 'C1',
        align: 'left',
        field: row => row.c1
      }, { name: 'c2', align: 'center', label: 'C2', field: 'c2' }, {
        name: 'c3', align: 'center', label: 'C3', field: 'c3'
      }],
      offer: [] */
  get appolo() {
    return {
      apollo: {
        puzzle: {
          query: gql`
          query puzzleMethod($id: Int!) {
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
            console.log(result);
          },
          update ({ allRes }) {
            console.log(allRes);
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
