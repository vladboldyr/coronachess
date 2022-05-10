<template>
    <div class="relative">
        <div @mouseenter="hoverInDesktop" @mouseleave="hoverInDesktop" @click="toggle">
            <slot/>
        </div>
        <div v-show="isShown" class="popup">
            {{ text }}
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import '../../css/popup/popup.css'

@Options({})
export default class CustomPopup extends Vue {
    @Prop({ required: true, type: String, default: 'message' }) readonly text!: string;

    private isShown: boolean = false;

    get isMobile (): boolean {
      return window.matchMedia('(max-width: 450px)').matches
    }

    private hoverInDesktop (): void {
      if (this.isMobile) return
      this.toggle()
    }

    private toggle (): void {
      this.isShown = !this.isShown
      console.log(`isShown ${this.isShown}`)
    }
}
</script>
