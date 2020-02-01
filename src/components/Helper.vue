<template>
  <div class="gdt-container mt-4">
    <h2 v-if="data === undefined">
      Please wait, loading...
    </h2>

    <template v-if="data !== undefined">
      <SortableTable
        title="Topics"
        key-name="topic"
        anchor-name="topics"
        :headers="genre_headers"
        :rows="data.topics"
      />

      <SortableTable
        title="Platforms"
        key-name="platform"
        anchor-name="platforms"
        :headers="genre_headers"
        :rows="data.platforms"
      />

      <SortableTable
        title="Single Genre Focus"
        key-name="focus"
        anchor-name="single_genre_focus"
        :headers="stage_headers"
        :rows="data.dev_focus"
      />

      <SortableTable
        title="Multiple Genre Focus"
        key-name="focus"
        anchor-name="multi_genre_focus"
        :headers="stage_headers"
        :rows="multiGenreDevFocus"
      />
    </template>
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
  props: {
    filter: {
      type: String,
      default: ''
    }
  },
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
  computed: {
    multiGenreDevFocus() {
      const multiDevFocus = [];
      this.data.dev_focus.forEach((outerFocus) => {
        this.data.dev_focus.forEach((innerFocus) => {
          if (outerFocus.focus === innerFocus.focus) return;

          const newRow = {
            focus: `${outerFocus.focus}/${innerFocus.focus}`,
            stage1: {},
            stage2: {},
            stage3: {},
          };
          ['stage1', 'stage2', 'stage3'].forEach((stage) => {
            Object.keys(outerFocus[stage]).forEach((key) => {
              newRow[stage][key] = (outerFocus[stage][key] * (2 / 3)) +
                                   (innerFocus[stage][key] * (1 / 3));
              newRow[stage][key] = newRow[stage][key].toFixed(2);
            });
          });

          multiDevFocus.push(newRow);
        });
      });

      return multiDevFocus;
    },
  },
    mounted() {
    jQuery.getJSON('data.json', (data) => {
      this.data = data;
    });
  },
};
</script>
