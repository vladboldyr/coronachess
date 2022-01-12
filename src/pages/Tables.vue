<template>
  <q-page class="q-pa-sm">

    <tables-basic></tables-basic>

    <table-actions class="q-mt-lg"></table-actions>

    <table-dark-mode class="q-mt-lg"></table-dark-mode>

    <table-progress class="q-mt-lg"></table-progress>

    <table-custom-grid class="q-mt-lg"></table-custom-grid>


    <q-card>
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          Tree Table
        </div>
        <div class="text-subtitle2">
          A simple Tree Collapsed/Expanded Table
        </div>
      </q-card-section>

      <q-separator></q-separator>
      <q-card-section class="q-pa-none">
        <simple-hierarchy></simple-hierarchy>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-sm">
      <q-card-section>
        <div class="text-h6 text-indigo-8">
          Custom Icon with Chip
        </div>
        <div class="text-subtitle2">
          A simple Tree Collapsed/Expanded Table
        </div>
      </q-card-section>
      <q-separator></q-separator>

      <q-card-section class="q-pa-none">
        <custom-hierarchy></custom-hierarchy>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
export default {
  name: "Tables",
  components: {
    TableProgress: () => import('components/tables/TableProgress'),
    TableCustomGrid: () => import('components/tables/TableCustomGrid'),
    TableDarkMode: () => import('components/tables/TableDarkMode'),
    TableActions: () => import('components/tables/TableActions'),
    TablesBasic: () => import('components/tables/TableBasic'),
    SimpleHierarchy: () => import('components/tree-table/SimpleHierarchy'),
    CustomHierarchy: () => import('components/tree-table/CustomHierarchy')
  },
}
</script>

<style>

</style>
