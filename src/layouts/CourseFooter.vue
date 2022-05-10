<template>
  <div v-if="isModeLesson" class="sl:wrapper-footer sm:wrapper-footer">
    <button v-if="activatedLesson" class="sl:btn_start sm:btn_start" v-on:click="pause">
      <i class="sl:play_block sm:play_block"></i>
    </button>
    <button v-else class="sl:btn_pause sm:btn_pause" v-on:click="start">
      <i class="sl:pause_block sm:pause_block"></i>
    </button>
    <button class="sl:btn_tasks sl:btn_tasks">
      <p>Решать задачи</p>
    </button>
  </div>
  <div v-else class="sl:wrapper-footer sm:wrapper-footer">
    <button class="sl:btn_previous sm:btn_previous" v-on:click="getPrevBlock">
      <i class="sl:arrow_block sm:arrow_block" :class="activeIndex > 0 ? 'active' : '' "></i>
    </button>
    <button class="sl:btn_next sm:btn_next" v-on:click="getNextBlock">
      <i class="active sl:arrow_block sm:arrow_block"></i>
    </button>
    <button class="sl:btn_tasks sm:btn_tasks">
      <p>Продолжить урок</p>
    </button>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component'
import '../css/course/course.css'
import { Prop } from 'vue-property-decorator'
export interface ICourseFooterProps {
  isModeLesson: boolean;
  getNextBlock: () => void;
  getPrevBlock: () => void;
}

@Options({
  components: {

  }
})
export default class CourseFooter extends Vue {
  @Prop({ required: true, type: Boolean, default: true }) isModeLesson: boolean;
  @Prop() activatedLesson: boolean;
  @Prop() activeIndex: number;
  @Prop() start: () => void;
  @Prop() pause: () => void;
  @Prop() getNextBlock: () => void;
  @Prop() getPrevBlock: () => void;
}
</script>
