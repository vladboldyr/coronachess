<template>
  <div class="merida blue">
    <div ref="board" class="cg-board-wrap"></div>
  </div>
</template>

<script lang="ts">
import {Prop, Watch} from 'vue-property-decorator';
import {Chessground} from 'chessground'
import {uniques} from './Util.js'
import {Vue} from 'vue-class-component';
import './style/theme.css';
import {ChessBoardBaseState, IChessBoardState} from 'components/chessboard/ChessBoardBaseState';
import {ChessBoardProps} from 'components/chessboard/ChessBoardCustom/ChessBoardCustom.vue';

const Chess = require('chess.js');

const colorArrowBrush = '#FFC83B';

export default class ChessBoard extends Vue {
  // Не работают дефолтные значения!!!
  // TO DO разобртаться почему
 @Prop({default: {fen: '', free: false, showThreats: false, onPromotion: () => 'q', orientation: 'white' }}) props!: ChessBoardProps;
 @Prop({default: ''}) fen: string;
 protected boardState: IChessBoardState;

 created() {
   this.boardState = new ChessBoardBaseState(this._fen/* this.props.fen */);

   // пока оставлю тут
   /* watch(() => this.props, (first, second) => {
     console.log(
       'Watch props.selected function called with args:',
       first,
       second
     );
   });

   watch(() => this.fen, (first, second) => {
     console.log(
       'Watch props.selected function called with args:',
       first,
       second
     );
   }); */
 }

 private _fen = '';

 public init() {
   const {config} = this.boardState;
   this.boardState.board = Chessground(this.$refs.board as HTMLElement, config);
   this.boardState.board.set({
     movable: { events: { after: this.changeTurn() } }
   })
 }

 @Watch('props.fen')
 propsFenChanged(newFen) {
   console.log('props.fen', newFen);
   this.boardState.fen = newFen;
   this.boardState.board.set({
     fen: newFen
   })
 }

 @Watch('fen')
 fenChanged(newFen) {
   this.$emit('fen', newFen);
   this.boardState.fen = newFen;
   this.boardState.board.set({
     fen: newFen
   })
   // this.fen = newFen
   this.loadPosition()
 }

 @Watch('orientation')
 orientation(orientation) {
   this.$emit('orientation', orientation)
   // this.orientation = orientation
   this.loadPosition()
 }

 @Watch('showThreats')
 showThreats(st) {
   this.$emit('showThreats', st)
   // this.showThreats = st
   if (this.showThreats) {
     this.paintThreats()
   }
 }

 /* onUpdated(()=> {
  console.log('onUpdated')
}) */

 onMounted() {
   console.log('onMounted');
 }

 mounted() {
   this.init();
   this.loadPosition()
 }

 opponentMoves () {
   const {game} = this.boardState;
   const originalPGN = game.pgn()
   let tokens = game.fen().split(' ')
   tokens[1] = tokens[1] === 'w' ? 'b' : 'w'
   tokens = tokens.join(' ')
   const valid = game.load(tokens)
   if (valid) {
     const moves = game.moves({ verbose: true })
     game.load_pgn(originalPGN)
     return moves
   } else {
     return []
   }
 }

 private coordinate: string;
 paintThreats () {
   const moves = this.boardState.game.moves({ verbose: true })
   const threats = []
   moves.forEach((move) => {
     if (move.captured) {
       threats.push({ orig: move.from, dest: move.to, brush: 'yellow' })
       // this.coordinate = `${move.from},${move.to},yellow`;
     }
     if (move.san.includes('+')) {
       threats.push({ orig: move.from, dest: move.to, brush: 'blue' })
     }
   })
   this.boardState.board.setShapes(threats)
 }

 calculatePromotions () {
   const moves = this.boardState.game.moves({ verbose: true })
   this.boardState.promotions = []
   for (const move of moves) {
     if (move.promotion) {
       this.boardState.promotions.push(move)
     }
   }
 }

 isPromotion (orig, dest) {
   const filteredPromotions = this.boardState.promotions.filter(move => move.from === orig && move.to === dest)
   return filteredPromotions.length > 0 // The current movement is a promotion
 }

 changeTurn () {
   return (orig, dest, metadata) => {
     if (this.boardState.isPromotion(orig, dest)) {
       this.boardState.promoteTo = this.props.onPromotion()
     }
     this.boardState.game.move({ from: orig, to: dest, promotion: this.boardState.promoteTo }) // promote to queen for simplicity
     // to do
     // this.wrapper-board.state.drawable.shapes - здесь данные фигур
     const {toColor, possibleMoves} = this.boardState;
     this.boardState.board.set({
       fen: this.boardState.game.fen(),
       turnColor: toColor(),
       movable: {
         color: toColor(),
         dests: possibleMoves()
       }
     })
     this.calculatePromotions()
     this.afterMove();
     // const sizeBoard = 328;
     // // const svg: HTMLElement = this.board.state.dom.elements?.svg;
     // const id = `${sizeBoard},${sizeBoard},${this.coordinate},true`;
     // const t = this.board.state.dom.elements?.svg.querySelectorAll(`g[cgHash="${id}"]`);
     // const tt = this.board.state.dom.elements?.svg.getElementsByTagName('g');
     // /* <line stroke="#e68f00" stroke-width="0.15625" stroke-linecap="round" marker-end="url(#arrowhead-y)" opacity="1" x1="-0.5" y1="0.5" x2="0.38951456543960195" y2="-0.38951456543960195" cgHash="328,328,d4,e5,yellow"></line>
     // * */
     // const line = document.createElement('line');
     // line.setAttribute('stroke', '#e68f00');
     // line.setAttribute('stroke-width', '0.15625')
     // line.setAttribute('stroke-linecap', 'round')
     // line.setAttribute('opacity', '1')
     // line.setAttribute('x1', '-0.5')
     // line.setAttribute('y1', '0.5')
     // line.setAttribute('x2', '0.389')
     // line.setAttribute('y2', '-0.389');
     // tt && tt.length > 0 && tt[0].appendChild(line);
     // console.log(this.board.getKeyAtDomPos([1, 2]));
     // console.log(t);
   }
 }

 // calculateShiftForArrow() {
 //   const sizeBoard = 328;
 //   // const svg: HTMLElement = this.board.state.dom.elements?.svg;
 //   // const id = `${sizeBoard},${sizeBoard},${this.coordinate}`;
 //   // const arrArrows = svg.querySelectorAll('[cgHem=`${id}`}]');
 // }

 afterMove () {
   if (this.props.showThreats) {
     this.paintThreats()
   }
   const threats = this.countThreats(this.boardState.toColor()) || {}
   threats.history = this.boardState.game.history()
   threats.fen = this.boardState.game.fen()
   console.log(this.boardState.board.state.dom.elements?.svg);
   this.$emit('onMove', threats)
 }

 protected countThreats (color): any {
   const threats = {}
   let captures = 0
   let checks = 0
   let moves = this.boardState.game.moves({ verbose: true })
   if (color !== this.boardState.toColor()) {
     moves = this.opponentMoves()
   }

   if (moves.length === 0) {
     return null // It´s an invalid position
   }

   moves.forEach(function (move) {
     if (move.captured) {
       captures++
     }
     if (move.san.includes('+')) {
       checks++
     }
   })

   threats[`legal_${color}`] = uniques(moves.map(x => x.from + x.to)).length // promotions count as 4 moves. This remove those duplicates moves.
   threats[`checks_${color}`] = checks
   threats[`threat_${color}`] = captures
   threats['turn'] = color
   return threats
 }

 loadPosition () {
   /* const position = loadPuzzle();
   watch(position, result => {
     this._fen = result.puzzle.position;
   }); */
   // set a default value for the configuration object itself to allow call to loadPosition()
   this.boardState.game.load(this._fen/* this.props.fen */)
   this.afterMove()
 }
}
</script>

<!--<script>
import Chess from 'chess.js'
import { Chessground } from 'chessground'
import { uniques } from './Util.js'

export default {
  name: 'chessboard',
  props: {
    fen: { // Fen binded to the chessboard
      type: String,
      default: ''
    },
    free: { // free moves instead of legal moves
      type: Boolean,
      default: false
    },
    showThreats: { // shows threats for current position and player
      type: Boolean,
      default: false
    },
    onPromotion: {
      type: Function,
      default: () => 'q'
    },
    orientation: { // black orientation instead of white
      type: String,
      default: 'white'
    }
  },
  watch: {
    fen: function (newFen) {
      this.$emit('fen', newFen)
      // this.fen = newFen
      this.loadPosition()
    },
    orientation: function (orientation) {
      this.$emit('orientation', orientation)
      // this.orientation = orientation
      this.loadPosition()
    },
    showThreats: function (st) {
      this.$emit('showThreats', st)
      // this.showThreats = st
      if (this.showThreats) {
        this.paintThreats()
      }
    }
  },
  methods: {
    possibleMoves () {
      const dests = new Map()
      this.game.SQUARES.forEach(s => {
        const ms = this.game.moves({ square: s, verbose: true })
        if (ms.length) dests.set(s, ms.map(m => m.to))
      })
      return dests
    },
    opponentMoves () {
      const originalPGN = this.game.pgn()
      let tokens = this.game.fen().split(' ')
      tokens[1] = tokens[1] === 'w' ? 'b' : 'w'
      tokens = tokens.join(' ')
      const valid = this.game.load(tokens)
      if (valid) {
        const moves = this.game.moves({ verbose: true })
        this.game.load_pgn(originalPGN)
        return moves
      } else {
        return []
      }
    },
    toColor () {
      return (this.game.turn() === 'w') ? 'white' : 'black'
    },
    paintThreats () {
      const moves = this.game.moves({ verbose: true })
      const threats = []
      moves.forEach(function (move) {
        threats.push({ orig: move.to, brush: 'yellow' })

        if (move.captured) {
          threats.push({ orig: move.from, dest: move.to, brush: 'red' })
        }
        if (move.san.includes('+')) {
          threats.push({ orig: move.from, dest: move.to, brush: 'blue' })
        }
      })
      this.board.setShapes(threats)
    },
    calculatePromotions () {
      const moves = this.game.moves({ verbose: true })
      this.promotions = []
      for (const move of moves) {
        if (move.promotion) {
          this.promotions.push(move)
        }
      }
    },
    isPromotion   (orig, dest) {
      const filteredPromotions = this.promotions.filter(move => move.from === orig && move.to === dest)
      return filteredPromotions.length > 0 // The current movement is a promotion
    },
    changeTurn () {
      return (orig, dest, metadata) => {
        if (this.isPromotion(orig, dest)) {
          this.promoteTo = this.onPromotion()
        }
        this.game.move({ from: orig, to: dest, promotion: this.promoteTo }) // promote to queen for simplicity
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
        this.afterMove()
      }
    },
    afterMove () {
      if (this.showThreats) {
        this.paintThreats()
      }
      const threats = this.countThreats(this.toColor()) || {}
      threats.history = this.game.history()
      threats.fen = this.game.fen()
      this.$emit('onMove', threats)
    },
    countThreats (color) {
      const threats = {}
      let captures = 0
      let checks = 0
      let moves = this.game.moves({ verbose: true })
      if (color !== this.toColor()) {
        moves = this.opponentMoves()
      }

      if (moves.length === 0) {
        return null // It´s an invalid position
      }

      moves.forEach(function (move) {
        if (move.captured) {
          captures++
        }
        if (move.san.includes('+')) {
          checks++
        }
      })

      threats[`legal_${color}`] = uniques(moves.map(x => x.from + x.to)).length // promotions count as 4 moves. This remove those duplicates moves.
      threats[`checks_${color}`] = checks
      threats[`threat_${color}`] = captures
      threats.turn = color
      return threats
    },
    loadPosition () { // set a default value for the configuration object itself to allow call to loadPosition()
      this.game.load(this.fen)

      this.board = Chessground(this.$refs.board, {
        coordinates: true,
        fen: this.game.fen(),
        turnColor: this.toColor(),
        movable: {
          color: this.toColor(),
          free: this.free,
          dests: this.possibleMoves(),
          showDests: true
        },
        orientation: this.orientation
      })
      this.board.state.animation.enabled = true;
      this.board.set({
        movable: { events: { after: this.changeTurn() } }
      })
      this.afterMove()
    }
  },
  mounted () {
    this.loadPosition()
  },
  created () {
    this.game = new Chess()
    this.board = null
    this.promotions = []
    this.promoteTo = 'q'
  }
}
</script> -->
