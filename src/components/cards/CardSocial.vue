<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm ">
        <div v-for="(item, index) in items" :key="index" class="col-md-3 col-sm-12 col-xs-12">
          <q-item :style="`background-color: ${item.color1}`" class="q-pa-none q-ml-xs">
            <q-item-section v-if="icon_position === 'left'" side :style="`background-color: ${item.color2}`" class=" q-pa-lg q-mr-none text-white">
              <q-icon :name="item.icon" color="white" size="24px"></q-icon>
            </q-item-section>
            <q-item-section class=" q-pa-md q-ml-none  text-white">
              <q-item-label class="text-white text-h6 text-weight-bolder">{{ item.value }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
            <q-item-section v-if="icon_position === 'right'" side class="q-mr-md text-white">
              <q-icon :name="item.icon" color="white" size="44px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "CardSocial",
  props: {
    icon_position: {
      required: false,
      default: "left"
    }
  },
  computed: {
    items: function() {
      return this.icon_position === "left"
        ? [
            {
              title: "У меня учеников",
              icon: "person",
              value: "102",
              color1: "#5064b5",
              color2: "#3e51b5"
            },
            {
              title: "Активных",
              icon: "fas fa-hiking",
              value: "38",
              color1: "#f37169",
              color2: "#f34636"
            },
            {
              title: "Не активных",
              icon: "fas fa-bed",
              value: "64",
              color1: "#ea6a7f",
              color2: "#ea4b64"
            },
            {
              title: "Решено задач",
              icon: "fas fa-tasks",
              value: "316",
              color1: "#a270b1",
              color2: "#9f52b1"
            }
          ]
        : [
            {
              title: "Доход за месяц",
              icon: "fas fa-dollar-sign",
              value: "38 651 р.",
              color1: "#546bfa",
              color2: "#3e51b5"
            },
            {
              title: "Курсов продано (мес)",
              icon: "fas fa-chart-bar",
              value: "18",
              color1: "#3a9688",
              color2: "#3e51b5"
            },
            {
              title: "Новых учеников (мес)",
              icon: "fas fa-chart-line",
              value: "5",
              color1: "#7cb342",
              color2: "#3e51b5"
            },
            {
              title: "Активных учеников",
              icon: "person",
              value: "42",
              color1: "#f88c2b",
              color2: "#3e51b5"
            }
          ];
    }
  }
};
</script>
