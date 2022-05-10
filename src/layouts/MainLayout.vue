<template>
  <q-layout>
  <router-view/>
  </q-layout>
</template>

<script>
import { RULocale } from '../i18n/ru/ru-ru'

import '../css/mainLayout/mainLayout.css'

// import "../css/mainLayout/mainLayoutCompiled.css";

const iconVK = require('../assets/icons/media_network_social_vk_icon.svg')
const iconInstagram = require('../assets/icons/media_network_social_instagram_icon.svg')
const playerManIcon = require('../assets/icons/player_man_icon.svg')

export default {
  name: 'MainLayout',

  data () {
    // TO DO temp
    return {
      text: '',
      textTooltip: RULocale.textPopup,
      textEmail: '',
      textTitle: 'Поколение Шахмат'.toUpperCase().split(' '),
      checkLevelGameText: `Проверьте
      уровень
      своей игры`,
      proceed: '75 % Продолжить',
      nameCourse: `Курс Магнуса
      Карлcона`,
      textBtnStatrGameCource: 'Начать',
      leftDrawerOpen: false,
      textInHeader: 'От простого к сложному',
      badge: '',
      iconVK: iconVK,
      iconInstagram: iconInstagram,
      playerManIcon: playerManIcon,
      firstContentTitle: `Шахматы развивают способности
      к математике`,
      firstContentText_BlockSelectedText: ' математика и точные науки',
      // firstContentText_Block1: `Детям, играющим в шахматы, легче даются <p class="custom-text">математика и точные науки</p>,<br/> потому что игра развивает ту же часть мозга.`,
      firstContentText_Block1_1: 'Детям, играющим в шахматы, легче даются',
      firstContentText_Block1_2: 'потому что игра развивает ту же часть мозга.',
      firstContentText_Block2: `Считая в   уме, решая шахматные задачи, разбирая партии, ребёнок развивает<br/>
      <p class="custom-text">память</p> и   <p class="custom-text"> усидчивость</p>, интуитивно постигает <p class="custom-text">основы логики</p>, <p class="custom-text">комбинаторики</p>,<br/>
      <p class="custom-text">теории вероятностей</p> и   <p class="custom-text">теории игр</p>.`,
      secondContentTitle: `Закаляют характер
        и   прививают
        дисциплину`,
      secondContentText_Block1: `Ребёнок учится принимать поражения и сдерживать эмоции,<br/>
       а   необходимость быстро <p class="custom-text">принимать   решения</p> и брать за них ответственность,<br/>
        развивает <p class="custom-text">внимательность</p> и   <p class="custom-text">стрессоустойчивость</p>.`,
      waitText: 'Скоро',
      active: false
    }
  },
  mounted () {
  },
  created () {
    this.listen()
  },
  methods: {
    listen () {
      if (process.env.DEV) {
        console.log('I\'m on a development build')
      }
      this.$echo.channel('test').listen('.event', (payload) => {
        // console.log('Caught the event: ', payload)
        if (payload && typeof payload.badge !== 'undefined') {
          this.badge = payload.badge
        }
      })
    }
  },
  mouseOver () {
    this.active = !this.active
  }
}
</script>
