<template>
  <div class="container mt-4">
    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <th class="border-top-0 border-left-0"></th>
          <th class="text-center border-bottom-0" :colspan="genres.length">Genres</th>
          <th class="text-center border-bottom-0" :colspan="audiences.length">Audience</th>
        </thead>
        <thead>
          <th scope="col"
            :class="currentSort.length === 0 ? 'table-info' : ''">
            Topic
          </th>
          <th scope="col"
            v-for="genre in genres"
            :key="genre"
            @click="sort(genre)"
            :class="['text-center', currentSort.indexOf(genre) !== -1 ? 'table-info' : '']">
            {{genre}}
          </th>
          <th scope="col"
            v-for="audience in audiences"
            :key="audience"
            @click="sort(audience)"
            :class="['text-center', currentSort.indexOf(audience) !== -1 ? 'table-info' : '']">
            {{audience}}
          </th>
        </thead>

        <tbody>
          <tr v-for="topic in sortedTopics" :key="topic.topic">
            <th scope="row">{{topic.topic}}</th>
            <td v-for="genre in genres"
              :key="topic + genre"
              :class="['text-center', cellClass(topic.genres[genre])]">
              {{topic.genres[genre]}}
            </td>
            <td v-for="audience in audiences"
              :key="topic + audience"
              :class="['text-center', cellClass(topic.audiences[audience])]">
              {{topic.audiences[audience]}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery';

export default {
  name: 'Helper',
  props: ['filter', 'currentSortDirAsc'],
  data() {
    return {
      currentSort: [],
      modifiable_topics: [
        'Cyberpunk',
        'Detective',
        'Law',
        'Music',
        'Mystery',
        'Racing',
        'Rhythm',
        'Sports',
      ],
      genres: [
        'Action',
        'Adventure',
        'RPG',
        'Simulation',
        'Strategy',
        'Casual',
      ],
      audiences: [
        'Young',
        'Everyone',
        'Mature',
      ],
      topics: [],
      platforms: [],
    };
  },
  mounted() {
    jQuery.getJSON('/static/data.json', (data) => {
      this.topics = data.topics;
      this.platforms = data.platforms;
    });
  },
  methods: {
    sort(s) {
      const idx = this.currentSort.indexOf(s);
      if (idx === -1) {
        if (this.currentSort.length === 2) {
          this.currentSort.pop();
        }

        this.currentSort.push(s);
      } else {
        this.currentSort.splice(idx, 1);
      }
    },
    cellClass(value) {
      if (value >= 1.0) return 'table-cell-ppp';
      if (value >= 0.9) return 'table-cell-pp';
      if (value >= 0.8) return 'table-cell-p';
      if (value >= 0.7) return 'table-cell-mm';

      return 'table-cell-mmm';
    },
  },
  computed: {
    sortedTopics() {
      const modifier = this.currentSortDirAsc ? 1 : -1;

      let s = [...this.topics];
      if (this.filter.length) {
        s = s.filter(item => item.topic.toLowerCase().includes(this.filter.toLowerCase()));
      }
      return s.sort((a, b) => {
        if (this.currentSort.length) {
          const sortStack = [...this.currentSort];
          while (sortStack.length) {
            const sortKey = sortStack.shift();

            let section = null;
            if (this.genres.indexOf(sortKey) !== -1) {
              section = 'genres';
            } else if (this.audiences.indexOf(sortKey) !== -1) {
              section = 'audiences';
            }
            const aVal = a[section][sortKey];
            const bVal = b[section][sortKey];
            if (aVal < bVal) return -1 * modifier;
            if (aVal > bVal) return 1 * modifier;
          }
        }
        return a.topic.localeCompare(b.topic) * modifier;
      });
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
