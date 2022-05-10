<template>
  <div>{{ props.text }}</div>
</template>

<script lang="ts" setup>
interface Props {
  text?: string
}
const props = withDefaults(defineProps<Props>(), {
  text: 'Parent text'
})

</script>
