<template>
    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
      <q-card class="fit">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
        >
          <q-tab name="contact" :class="tab=='contact'?'text-blue':''" icon="contacts" label="Ученики"/>
          <q-tab name="message" :class="tab=='message'?'text-blue':''" icon="comment" label="Сообщения">
            <q-badge color="red" floating>{{messages.length}}</q-badge>
          </q-tab>
          <q-tab name="notification" :class="tab=='notification'?'text-blue':''" icon="notifications"
                  label="Уведомления">
            <q-badge color="red" floating>4</q-badge>
          </q-tab>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="contact" class="q-pa-sm">
            <q-list class="rounded-borders" separator>

              <q-item
                v-for="(contact, index) in contacts"
                :key="index"
                clickable
                v-ripple
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="contact.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">{{contact.name}}</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{contact.position}}</span>
                  </q-item-label>
                </q-item-section>

                <q-item-section side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn class="gt-xs" size="md" flat color="blue" dense round icon="comment"/>
                    <q-btn class="gt-xs" size="md" flat color="red" dense round icon="email"/>
                    <q-btn size="md" flat dense round color="green" icon="phone"/>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>

          </q-tab-panel>

          <q-tab-panel name="message" class="q-pa-sm">
            <q-item v-for="msg in messages" :key="msg.id" clickable v-ripple>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="msg.avatar">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ msg.name }}</q-item-label>
                <q-item-label caption lines="1">{{ msg.msg }}</q-item-label>
              </q-item-section>

              <q-item-section side>
                {{msg.time}}
              </q-item-section>
            </q-item>
          </q-tab-panel>

          <q-tab-panel name="notification" class="q-pa-sm">
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="info"/>
                </q-item-section>

                <q-item-section>Просрочка оплаты: Василий Иванов</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="report"/>
                </q-item-section>

                <q-item-section>Просрочка оплаты: Вика Григорьева</q-item-section>
              </q-item>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="remove"/>
                </q-item-section>

                <q-item-section>Пётр Зайцев не пользуется сервисом 28 дней</q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar color="teal" text-color="white" icon="remove_circle_outline"/>
                </q-item-section>

                <q-item-section>Кирилл Москалёв: нелицензионное подключение</q-item-section>
              </q-item>

          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'TabSocial',
  data () {
    return {
      tab: 'contact',
      contacts: [
        {
          name: 'Василий Иванов',
          position: 'Рейтинг: 1215',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4'
        },
        {
          name: 'Роман Станиславский',
          position: 'Рейтинг: 1361',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg'
        },
        {
          name: 'Михаил Олегович',
          position: 'Рейтинг: 1649',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg'
        },
        {
          name: 'Белла Пахнович',
          position: 'Рейтинг: 1039',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg'
        },
        {
          name: 'Анастасия Соколова',
          position: 'Рейтинг: 1157',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg'
        }
      ],
      messages: [
        {
          id: 5,
          name: 'Василий Иванов',
          msg: ' -- Я решил задачи 132, 329, 824.\n' +
            '            Проверьте, пожалуйста.',
          avatar: 'https://avatars2.githubusercontent.com/u/34883558?s=400&v=4',
          time: '10:42 PM'
        }, {
          id: 6,
          name: 'Анастасия Соколова',
          msg: ' -- Я второй день решаю задачу 654.\n' +
            '            Помогите пожалуйста.',
          avatar: 'https://cdn.quasar.dev/img/avatar6.jpg',
          time: '11:17 AM'
        }, {
          id: 1,
          name: 'Никита Попов',
          msg: ' -- А я всё решил и мне скучно.\n' +
            '',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
          time: '5:17 AM'
        }, {
          id: 2,
          name: 'Михаил Олегович',
          msg: ' -- Вы меня замучили своими головоломками!\n' +
            '       Верните деньги!',
          avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
          time: '5:17 AM'
        }, {
          id: 3,
          name: 'Роман Станиславский',
          msg: ' -- Дайте задачи посложнее!\n' +
            '           ',
          avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
          time: '5:17 AM'
        }
      ],
    }
  }
}
</script>
