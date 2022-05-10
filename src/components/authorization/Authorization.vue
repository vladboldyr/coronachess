<template>
    <div>
        <q-btn @click="toggle" v-if="isAuth" round flat >
            <q-avatar size="48px">
                <img :src="playerManIcon" />
            </q-avatar>
        </q-btn>
        <div v-else class="text_auth">
            <div v-show="!isEnterEmail" @click="toggleIsEnterEmail">Войти</div>
            <div v-if="isEnterEmail">
                <ModalAuth :isEmail="isEmail"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ModalAuth from './ModalAuth.vue'
import { Vue, Options } from 'vue-class-component'

import '../../css/auth.css'

const manIcon = require('../../assets/icons/player_man_icon.svg')

@Options({
  components: {
    ModalAuth: ModalAuth
  }
})
export default class Authorization extends Vue {
    private playerManIcon: string = manIcon;

    // TO DO temp
    private isAuth: boolean = false;
    private isEnterEmail: boolean = false;

    private toggle (): void {
      this.isAuth = !this.isAuth
    }

    private toggleIsEnterEmail (): void {
      this.isEnterEmail = !this.isEnterEmail
    }

    private isEmail (): void {
      this.toggleIsEnterEmail()
      this.toggle()
    }
}
</script>
