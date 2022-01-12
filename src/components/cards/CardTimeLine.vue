<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit">
      <q-card-section class="text-h6 q-pb-none">
        <q-item>
          <q-item-section avatar class="">
            <q-icon color="blue" name="access_time" style="font-size: 2em;"/>
          </q-item-section>

          <q-item-section>
            <div class="text-h6">Хронология</div>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-section class="">
        <q-timeline color="secondary">

          <q-timeline-entry
            v-for="(timeline, index) in timeline_list"
            :key="index"
            :title="timeline.title"
            :subtitle="timeline.subtitle" :color="timeline.color" :icon="timeline.icon"
            :side="timeline.side"
          >
            <div>
              {{timeline.desc}}
            </div>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CardTimeLine',
  data () {
    return {
      timeline_list: [
        {
          title: 'Михаил решил самую сложную задачу',
          side: 'left',
          desc: 'после полутора часов размышлений, он смог решить самую сложную задачу в его практике.\n' +
            '                  Молодец!',
          color: 'red',
          icon: 'thumb_up'
        },
        {
          title: 'Coronachess обновлён',
          side: 'left',
          desc: 'Вчера была выпущена новая версия приложения Coronachess.\n' +
            '                  Не забудьте обновиться!.',
          color: 'orange',
          icon: 'done_all'
        }, {
          title: 'Иван Голубев заплатил сразу за 4 месяца.',
          side: 'left',
          desc: 'В кассу поступило 3471 руб.\n' +
            '                  Ивана надо поздравить!',
          color: 'blue',
          icon: 'thumb_up'
        }
      ],
    }
  }
}
</script>
