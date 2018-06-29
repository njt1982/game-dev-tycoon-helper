<template>
  <div class="container mt-4">
    <h2 v-if="data === undefined">Please wait, loading...</h2>

    <div v-if="data !== undefined">
      <a name="topics"></a>
      <SortableTable title="Topics"
                     keyName="topic"
                     :headers="genre_headers"
                     :rows="data.topics" />

      <a name="platforms"></a>
      <SortableTable title="Platforms"
                     keyName="platform"
                     :headers="genre_headers"
                     :rows="data.platforms" />

      <a name="dev_focus"></a>
      <SortableTable title="Development Focus"
                     keyName="focus"
                     :headers="stage_headers"
                     :rows="data.dev_focus" />
   </div>
  </div>
</template>

<script>
import jQuery from 'jquery';
import SortableTable from './SortableTable';

export default {
  name: 'Helper',
  components: {
    SortableTable,
  },
  props: ['filter', 'currentSortDirAsc'],
  data() {
    return {
      data: undefined,
      genre_headers: [
        {
          title: 'Genres',
          attribute: 'genres',
          columns: [
            'Action',
            'Adventure',
            'RPG',
            'Simulation',
            'Strategy',
            'Casual',
          ],
        },
        {
          title: 'Audiences',
          attribute: 'audiences',
          columns: [
            'Young',
            'Everyone',
            'Mature',
          ],
        },
      ],
      stage_headers: [
        {
          title: 'Stage 1',
          attribute: 'stage1',
          columns: [
            'Engine',
            'Gameplay',
            'Story/Quests',
          ],
        },
        {
          title: 'Stage 2',
          attribute: 'stage2',
          columns: [
            'Dialogues',
            'Level Design',
            'AI',
          ],
        },
        {
          title: 'Stage 3',
          attribute: 'stage3',
          columns: [
            'World Design',
            'Graphic',
            'Sound',
          ],
        },
      ],
    };
  },
  mounted() {
    jQuery.getJSON('/static/data.json', (data) => {
      this.data = data;
    });
  },
  computed: {
    multiGenreDevFocus() {

    },
  },
};
</script>
