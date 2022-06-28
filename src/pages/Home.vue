<template>
  <q-layout>
    <q-page>
      <div class="home-header">
        <div class="home-title">
          <p>Поколение шахмат</p>
        </div>
        <div class="home-navBar">
          <div class="menu-list">
          <div class="focus:animate-spin">Курсы</div>
          <div>Задачи</div>
          <div>Учителя</div>
          <div>Вход</div>
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script lang="ts">
import '../css/home/home.css';
import 'tailwindcss/tailwind.css'
import {Vue} from 'vue-class-component';
export default class Home extends Vue {}
</script>
