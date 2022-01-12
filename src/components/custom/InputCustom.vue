<template>
    <div class="flex">
      <input v-model="text" class="input-text-custom" :placeholder="placeholder"/>
      <button class="send-btn" @click="isEmail">
        <!-- <div v-html="btnContent"></div> -->
        <!-- <i class="arrow"></i> -->
        <div style="color: white">Войти</div>
      </button>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import "../../css/custom/input.css";


@Component
export default class InputCustom extends Vue {

    @Prop({required: true, type: Function, default: ''}) isEmail!: Function;
    @Prop({required: true, type: String, default: ''}) text!: string;
    @Prop({required: true, type: String, default: ''}) placeholder!: string;
    // @Prop({required: true, type: HTMLElement, default: ''}) btnContent!: HTMLElement;



}
</script>