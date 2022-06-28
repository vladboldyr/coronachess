<template>
    <div class="main">
      <div class="wrapper">
        <div class="header">
          <div class="header__content">Вход</div>
        </div>
        <div style="width: 100%; height: 100%;margin-top: 20px">
          <div class="alternate__wrapper">
            <div class="alternate__auth">
              <div class="way__block"><img :src="iconGoogle"/></div>
              <div class="way__block"><img :src="iconVK"/></div>
            </div>
          </div>
          <div class="wrapper-form">
            <div class="form">
            </div>
            <div class="enter"></div>
          </div>
        </div>
        <div class="registration" style="width: 100%; height: 23%">Регистрация</div>
      </div>
    </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import '../../css/authorization/authDesk.css';

const iconVK = require('../../assets/icons/vk_icon.svg')
const iconGoogle = require('../../assets/icons/google_icon.svg')

export default class Authorization extends Vue {
  private iconVK = iconVK;
  private iconGoogle = iconGoogle;
}

</script>
