<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm  q-py-sm">
      <div class="center col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card>
          <chessboard @onMove="onMove" :fen="puzzle.position"  style="padding-left: 1em; padding-top: 1em;" />
        </q-card>
      </div>

      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <div class="q-pa-md row justify-center q-card">
          <div style="width: 100%; max-width: 400px">
            <q-chat-message
              name="Кот"
              avatar="https://wiki.cidious.com/generationchess.png"
              :text="[`Итальянская партия начинается ходами пешка е-4 е-5, конь f3 це-6, слон це-4.`]"
            />
            <q-chat-message
              name="Женя"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :text="['Понятно']"
              sent
            />
            <q-chat-message
              name="Кот"
              avatar="https://wiki.cidious.com/generationchess.png"
              :text="[`Цель -- быстро захватить  центр пешкой и конём`]"
            />
            <q-chat-message
              name="Женя"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :text="['Понятно']"
              sent
            />
            <q-chat-message
              name="Кот"
              avatar="https://wiki.cidious.com/generationchess.png"
              :text="[`вывести слона на поле, откуда он угрожает слабой пешке f7`]"
            />
            <q-chat-message
              name="Женя"
              avatar="https://cdn.quasar.dev/img/avatar3.jpg"
              :text="['Понятно']"
              sent
            />
            <q-chat-message
              name="Кот"
              avatar="https://wiki.cidious.com/generationchess.png"
              :text="[`и подготовить рокировку.`]"
            />
            <q-spinner-dots size="2rem"/>
          </div>
        </div>

        <div class="q-pa-md">
          <q-btn-group rounded>
            <q-btn rounded color="primary" label="Понятно" />

            <q-btn rounded color="primary" label="Повтори" />

            <q-btn-dropdown auto-close rounded color="primary" label="У меня вопросик" split>
              <!-- dropdown content goes here -->
              <q-list padding style="width: 280px">
                <q-item clickable>
                  <q-item-section avatar>
                    <q-avatar icon="folder" color="purple" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Простой вопросик 1</q-item-label>
                    <q-item-label caption>А почему белые ходят первыми?</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" color="amber" />
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-avatar icon="folder" color="purple" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Простой вопросик 2</q-item-label>
                    <q-item-label caption>А почему король такой ценный?</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" color="amber" />
                  </q-item-section>
                </q-item>

                <q-separator inset />
                <q-item-label header>Сложные вопросы</q-item-label>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-avatar icon="assignment" color="teal" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Сложный вопрос 1</q-item-label>
                    <q-item-label caption>Что такое ферзевой гамбит?</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" color="amber" />
                  </q-item-section>
                </q-item>

                <q-item clickable>
                  <q-item-section avatar>
                    <q-avatar icon="assignment" color="teal" text-color="white" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Сложный вопрос 2</q-item-label>
                    <q-item-label caption>Кто такой Рой Лопез?</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info" color="amber" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import chessboard from 'components/chessboard/index.vue'
import 'components/chessboard/style/theme.css'
import gql from 'graphql-tag'
import Echo from 'laravel-echo'

export default {
  components: {
    chessboard
  },
  apollo: {
    puzzle: {
      query: gql`
          query {
            puzzle(id: 1367) {
              id
              name
              position
              solution
              tags {
               name_ru
              }
            }
          }
        `
    }
  },
  data() {
    return {
      onMove(data) {
        console.log('onmove', data);
        window.Pusher.instances[0].connection.connection.transport.socket.send(JSON.stringify({
          event: 'event',
          channel: 'test',
          data: JSON.stringify(data.history)
        }));
      },
      data: [{
        c1: 'Ae2e4', c2: 159, c3: 6,
      }, {
        c1: 'Be2e4', c2: 72, c3: 5,
      }, {
        c1: 'Ce2e4', c2: 180, c3: 9,
      }, {
        c1: 'De2e4', c2: 1, c3: 22,
      },],
      filter: '',
      puzzle: {position:""},
      show_filter: false,
      columns: [{
        name: 'c1',
        required: true,
        label: 'C1',
        align: 'left',
        field: row => row.c1
      }, {name: 'c2', align: 'center', label: 'C2', field: 'c2'}, {
        name: 'c3', align: 'center', label: 'C3', field: 'c3'
      },],
      offer: []
    }
  },
  created() {
    this.listen()
  },
  methods: {
    listen() {
      this.$echo.channel('test').listen('.puzzle', (payload) => {
        if (payload && typeof payload.move != 'undefined') {
          // payload.move;
        }
      })
    },
  }
}
</script>
