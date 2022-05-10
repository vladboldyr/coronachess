<template>
  <div class="merida blue">
    <div ref="board" class="cg-board-wrap"></div>
  </div>
</template>

<script>
import Chess from 'chess.js'
import { Chessground } from 'chessground'
import { uniques } from './Util.js'

export default {
  name: 'oldchessboard',
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
      // this.board.state.animation.enabled = true;
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
</script>
