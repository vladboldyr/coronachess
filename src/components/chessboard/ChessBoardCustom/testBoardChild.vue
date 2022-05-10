<template>
  <div>{{ text }}</div>
</template>

<script lang="ts">
interface Props {
  text?: string
}
import TestBoard from 'components/chessboard/ChessBoardCustom/testBoard.vue';

export default {
  extends: TestBoard,
  props: {
    text: String
  },
  setup(props) {
    const text = props.text || 'Child Board';
    return text;
  }
}

</script>
