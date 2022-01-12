<template>
    <div class="relative">
        <div class="wrapper-modal">
            <InputCustom :text="text" :placeholder="placeholder" :isEmail="isEmail"/>
            <div class="flex" style="margin-top: 16px">
                <div class="cursor-pointer"><img :src="iconGoogle"/></div>
                <div class="cursor-pointer"><img :src="iconVK"/></div>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import "../../css/auth.css";
import InputCustom from "../custom/InputCustom.vue";

const iconVK = require("../../assets/icons/vk_icon.svg");
const iconGoogle = require("../../assets/icons/google_icon.svg");




@Component({
    components: {
        InputCustom: InputCustom
    }
})
export default class ModalAuth extends Vue {
    private iconVK = iconVK;
    private iconGoogle = iconGoogle;

    @Prop({required: true, type: Function, default: ''}) isEmail!: Function;

    private text : string = "fdfd";
    private placeholder : string = "placeholder";

}
</script>