<template>
  <div class="container">
    <q-header class="sl:header sm:header">
        <div class="sl:back">
          <button class="sl:btn-back" @click="goToBackPage">
            <i class="sl:arrow_exit"></i>
          </button>
        </div>
        <div class="sl:title sm:title">{{ title }}</div>
        <button class="sl:btn-mark sm:btn-mark">
          <img :src="mark"/>
        </button>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="flex" style="flex-direction: column">
          <board/>
          <div class="sl:info_course-wrapper sm:info_course-wrapper">
            <div class="sl:info_course sm:info_course">
              <div class="sl:block_text sm:block_text" v-for="(block, index) in textCourse" :key="index" :class="{block_active: index === activeIndex}"
                   :style="getStyleObject(index)" ref="items">
                {{block}}
              </div>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer class="sl:footer">
      <CourseFooter :activatedLesson="activatedLesson" :start="start" :pause="pause" :activeIndex="activeIndex" :isModeLesson="isModeLesson" :getNextBlock="getNextBlock" :getPrevBlock="getPrevBlock"/>
    </q-footer>
  </div>
</template>

<script lang="ts">
import Board from 'components/wrapper-board/Board.vue'
import CourseFooter from '../layouts/CourseFooter.vue'
import {Options, Vue} from 'vue-class-component'
import '../css/course/course.css'
import {textCourse} from 'assets/text_course';

export interface ICourse {
  title: string;
}
const mark = require('../assets/icons/book_mark.svg')

@Options({
  components: {
    Board: Board,
    CourseFooter: CourseFooter
  }
})
export default class Course extends Vue {
  // @Prop() course!: ICourse;

  // to do
  private title: string = 'Как использовать ладей';
  private activeIndex: number = 0;
  private activatedLesson: boolean = true;
  private itemsHeightBlock: Array<any> = [];

  private getStyleObject(index: number): any {
    const element = this?.$refs?.items && this.$refs.items[index];
    let styleObject = {
      display: 'flex',
      paddingBottom: '16px'
    }
    if (index === 0 && this.activeIndex === 0) {
      styleObject = {...styleObject, ...{paddingTop: '16px'}}
    }
    if (index + 1 < this.activeIndex) {
      return {display: 'none'};
    }
    if (index < this.activeIndex) {
      const coefficient = 0.5
      let value = element?.offsetHeight * coefficient;
      const correctValue = 20;
      if (value === 0) {
        value = (this.itemsHeightBlock[index] * (coefficient * coefficient)) - 10;
      } else if (value > 60) {
        value += correctValue;
      } else {
        value -= correctValue;
      }
      styleObject = {...styleObject, ...{marginTop: `-${value}px`}};
      return styleObject;
    }
    return styleObject;
  }

  private isModeLesson = false;

  private get textCourse(): Array<string> {
    return textCourse;
  }

  private getNextBlock(): void {
    if (this.activeIndex === this.textCourse.length - 1) return;
    this.activeIndex = this.activeIndex + 1;
  }

  private getPrevBlock(): void {
    if (this.activeIndex === 0) return;
    this.activeIndex = this.activeIndex - 1;
  }

  private start(): void {
    this.activatedLesson = true;
  }

  private pause(): void {
    this.activatedLesson = false;
  }

  mounted() {
    document.body.classList.add('wrapper');
    const arr = this.$refs.items as Array<any>;
    for (let index = 0; index < arr.length; index++) {
      this.itemsHeightBlock.push(arr[index].offsetHeight)
    }
    // this.itemsBlock = [...this.$refs.items as Array<any>];
  }

  unmounted() {
    document.body.className = '';
  }

  private mark = mark;

  private goToBackPage(): void {
    this.$router.push('/');
  }
}
</script>
