<template>
  <q-layout >
    <q-header style="position:relative">
      <div class="header_container sl:header_container">
        <div class="sl:intro_background sm:intro_background">
          <div class="container sl:containerMobile">
            <q-toolbar>
              <q-toolbar-title class="sm:header-title justify-items-center sl:header_titleMobile">
                <div class="sm:title-text sl:title-text">
                  {{textTitle[0]}} <br/>
                  {{textTitle[1]}}
                </div>
                <div class="pr-4">
                 <Authorization />
                </div>
              </q-toolbar-title>
            </q-toolbar>
            <q-toolbar>
              <q-toolbar-title>
                <div class="grid grid-cols-3 sl:flex flex-col items-start p-0">
                  <div class="col-span-2 sl:continueTest">
                    <div class="sl:iconMobile">
                      <img src="../assets/icons/main_layout_pawn_icon.svg">
                    </div>
                    <div class="flex flex-col space-y-4 ">
                      <div style="max-width:100px">Курс</div>
                      <div class="header-text text-left">{{textInHeader}}</div>
                      <div class="flex pt-4">
                        <div class="continue_game_btn">
                            <q-btn unelevated >
                              <p class="text-btn">12 из 14 Продолжить</p>
                            </q-btn>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-1 grid grid-rows-2 gap-y-12  sl:block" >
                    <div class="grid grid-rows-1 grid-cols-3 sm:block-test sl:block-testMobile" >
                      <div class="icon-base sm:row-span-4 sl:iconMobile" style="min-width:32px" >
                        <img src="../assets/icons/main_layout_question_icon.svg">
                      </div>
                      <div class="block_cource sm:col-start-2">
                        <div class="sl:header-cource check-level-game_title sm:check-level-game_title">Тест</div>
                        <div class="check-level-game_text sl:text-cource">
                          <p class="text-left">{{checkLevelGameText}}</p>
                        </div>
                        <div class="check-level-game_btn">
                          <q-btn unelevated >
                            <p class="text-btn">{{proceed}}</p>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                    <div class="sm:continueTest sl:container-cource block-testMobile">
                      <div class="icon-base sl:iconMobile">
                        <img src="../assets/icons/main_layout_pawn_icon.svg">
                      </div>
                      <div class="block_cource">
                        <div class="sl:header-cource check-level-game_title sm:check-level-game_title">Курс</div>
                        <div class="check-level-game_text sl:text-cource">
                         <p class="text-left">{{textInHeader}}</p>
                        </div>
                        <div class="check-level-game_btn">
                          <q-btn unelevated >
                            <p class="text-btn">12 из 14 Продолжить</p>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-rows-1 grid-cols-3 sm:block-test sl:block-testMobile">
                      <div class="icon-base sm:row-span-4 sl:iconMobile" style="min-width:32px">
                        <img src="../assets/icons/main_layout_horse_icon.svg" style="transform: matrix(-1, 0, 0, 1, 0, 0);">
                      </div>
                      <div class="block_cource sm:col-span-2">
                        <div class="sl:check-level-game_title sm:check-level-game_title">Курс</div>
                        <div class="check-level-game_text sl:text-cource">
                          <p class="text-left">{{nameCourse}}</p>
                        </div>
                        <div class="check-level-game_btn btn_start_game">
                          <q-btn unelevated>
                            <p class="text-btn">{{textBtnStatrGameCource}}</p>
                          </q-btn>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-wrap items-center sl:justify-start mt-12 sm:justify-end space-x-4 pr-4" >
                      <div class="sl:social-networks_text sm:social-networks_text">Мы в соцсетях</div>
                      <div class="cursor-pointer"><img :src="iconVK"/></div>
                      <div class="cursor-pointer"><img :src="iconInstagram"/></div>
                    </div>
                  </div>
                </div>
              </q-toolbar-title>
            </q-toolbar>
          </div>
        </div>
      </div>
    </q-header>
   
    <q-page-container class="page_container sl:page_container">
        <div class=" sl:block_content sm:block_content block_content-info">
          <div class="sl:block_content-title sm:block_content-title">{{firstContentTitle}}</div>
          <div class="flex sl:block_content-text sm:block_content-text">
             <div>{{firstContentText_Block1_1}}e&nbsp;</div>
             <Custom-Popup :text="textTooltip">
                <p class="custom-text">{{firstContentText_BlockSelectedText}}</p>,<br/>
             </Custom-Popup>
             <div>{{firstContentText_Block1_2}}</div>
          </div>
          <div class="sl:block_content-text sm:block_content-text" v-html="firstContentText_Block2"></div>
        </div>
        <div class="sl:block_content sm:block_content block_content-info">
          <div class="sl:block_content-title sm:block_content-title">{{secondContentTitle}}</div>
          <div class="sl:block_content-text sm:block_content-text" v-html="secondContentText_Block1">
            
            </div>
        </div>
        <div class="sl:block_content sm:block_content">
          <div class="sl:block_content-wait sm:block_content-wait">
            <div class="sm:block_content-wait_info sl:text-wait">{{waitText}}</div>
            <div class="sm:block_content-wait_info title-text-info_wait sl:title-text-info_wait">Онлайн-игра</div>
            <div style="padding-top:16px;">
              <div class="block_content-wait_info" style="display:flex">
                <input v-model="text" class="sm:input-text sl:input-text" placeholder="Электронная почта"/>
                <button class="send-btn ">
                  <i class="arrow"></i>
                </button>
              </div>
              <div class="block_content-wait_info sl:text-wait">Оставьте почту, и мы сообщим, когда можно будет поиграть с другими людьми!</div>
            </div>
          </div>
        </div>
        <div class="sl:block_content sm:block_content">
          <div class="sl:block_content-wait sm:block_content-wait">
            <div class="sm:block_content-wait_info sl:text-wait">{{waitText}}</div>
            <div class="sm:block_content-wait_info title-text-info_wait sl:title-text-info_wait">Преподаватели</div>
            <div style="padding-top:16px;">
              <div class="block_content-wait_info" style="display:flex">
                <input  v-model="text" class="sm:input-text sl:input-text" placeholder="Электронная почта"/>
                <button class="send-btn ">
                  <i class="arrow"></i>
                </button>
              </div>
              <div class="block_content-wait_info sl:text-wait">Оставьте почту, и мы сообщим, когда на сайте появятся<br/> преподователи!</div>
            </div>
          </div>
        </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import CustomPopup from "components/popup/CustomPopup"
import Authorization from "components/authorization/Authorization"
import {RULocale} from "../i18n/ru/ru-ru"

import "../css/mainLayout/mainLayout.css";

//import "../css/mainLayout/mainLayoutCompiled.css";

const iconVK = require("../assets/icons/media_network_social_vk_icon.svg");
const iconInstagram = require("../assets/icons/media_network_social_instagram_icon.svg");
const playerManIcon = require("../assets/icons/player_man_icon.svg");

export default {
  name: 'MainLayout',

  components: {
   CustomPopup,
   Authorization
  },

  data() {
    //TO DO temp
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
      textInHeader: "От простого к сложному",
      badge: '',
      iconVK: iconVK,
      iconInstagram: iconInstagram,
      playerManIcon: playerManIcon,
      firstContentTitle: `Шахматы развивают способности
      к математике`,
      firstContentText_BlockSelectedText: 'математика и точные науки',
      // firstContentText_Block1: `Детям, играющим в шахматы, легче даются <p class="custom-text">математика и точные науки</p>,<br/> потому что игра развивает ту же часть мозга.`,
      firstContentText_Block1_1: `Детям, играющим в шахматы, легче даются`,
      firstContentText_Block1_2: 'потому что игра развивает ту же часть мозга.',
      firstContentText_Block2: `Считая в уме, решая шахматные задачи, разбирая партии, ребёнок развивает<br/> 
      <p class="custom-text">память</p> и <p class="custom-text">усидчивость</p>, интуитивно постигает <p class="custom-text">основы логики</p>, <p class="custom-text">комбинаторики</p>,<br/>
      <p class="custom-text">теории вероятностей</p> и <p class="custom-text">теории игр</p>.`,
      secondContentTitle: `Закаляют характер
        и прививают
        дисциплину`,
      secondContentText_Block1 : `Ребёнок учится принимать поражения и сдерживать эмоции,<br/>
       а необходимость быстро <p class="custom-text">принимать решения</p> и брать за них ответственность,<br/>
        развивает <p class="custom-text">внимательность</p> и <p class="custom-text">стрессоустойчивость</p>.`,
      waitText: "Скоро",
      active: false
    }
  },

  created() {
    this.listen()
  },
  methods: {
    listen() {
      this.$echo.channel('test').listen('.event', (payload) => {
        // console.log('Caught the event: ', payload)
        if (payload && typeof payload.badge != 'undefined') {
          this.badge = payload.badge;
        }
      })
    },
    mouseOver() {
        this.active = !this.active;   
    },
  }
}
</script>
