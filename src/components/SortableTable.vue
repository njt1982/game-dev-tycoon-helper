<template>
  <div class="table-responsive mb-5">
    <form class="form-inline float-right mb-2">
      <div class="input-group">
        <input class="form-control rounded-0"
               type="search"
               placeholder="Filter"
               v-model="filter"
               aria-label="Filter">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary"
                  type="button"
                  @click="reset">
            <i class="fas fa-undo"></i>
          </button>
          <button class="btn btn-outline-secondary"
                  type="button"
                  @click="currentSortDirAsc = !currentSortDirAsc">
            <i :class="['fas', sortIcon]"></i>
          </button>
        </div>
      </div>
    </form>

    <h2>{{title}}</h2>

    <table class="table table-sm table-bordered">
      <thead>
        <th class="border-top-0 border-left-0"></th>

        <template
          v-for="(headerGroup, index) in headers">
          <th v-if="index > 0"
            :key="'th1_' + index"
            class="border-bottom-0 border-top-0"></th>
          <th
            scope="col"
            class="text-center border-bottom-0"
            :key="'headerGroup' + index"
            :colspan="headerGroup.columns.length">
            {{headerGroup.title}}
          </th>
        </template>
      </thead>
      <thead>
        <th scope="col"
          :class="currentSort.length === 0 ? 'table-info' : ''">
          {{title}}
        </th>

        <template
          v-for="(headerGroup, index) in headers">
          <th v-if="index > 0"
            :key="'th2_spacer' + index"
            class="border-bottom-0 border-top-0"></th>
          <th scope="col"
            v-for="colTitle in headerGroup.columns"
            :key="colTitle"
            @click="sort(colTitle)"
            :class="['text-center', currentSort.indexOf(colTitle) !== -1 ? 'table-info' : '']">
            {{colTitle}}
          </th>
        </template>
      </thead>

      <tbody>
        <tr v-for="row in sortedRows" :key="row[keyName]">
          <th scope="row">{{row[keyName]}}</th>

          <template
            v-for="(headerGroup, index) in headers">
            <td v-if="index > 0" :key="'td_spacer' + index"></td>
            <td scope="row"
              v-for="colTitle in headerGroup.columns"
              :key="row[keyName] + colTitle"
              :class="['text-center',cellClass(row[headerGroup.attribute][colTitle])]">
              {{row[headerGroup.attribute][colTitle]}}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'sortableTable',
  props: ['title', 'headers', 'rows', 'keyName'],
  data() {
    return {
      currentSort: [],
      currentSortDirAsc: true,
      filter: '',
    };
  },
  methods: {
    reset() {
      this.currentSort = [];
      this.currentSortDirAsc = true;
      this.filter = '';
    },
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
    sortIcon() {
      return this.currentSortDirAsc ? 'fa-sort-amount-down' : 'fa-sort-amount-up';
    },

    sortedRows() {
      if (!this.rows) {
        return [];
      }

      const modifier = this.currentSortDirAsc ? 1 : -1;

      let s = [...this.rows];
      if (this.filter.length) {
        s = s.filter(item => item[this.keyName].toLowerCase().includes(this.filter.toLowerCase()));
      }
      return s.sort((a, b) => {
        if (this.currentSort.length) {
          const sortStack = [...this.currentSort];
          while (sortStack.length) {
            const sortKey = sortStack.shift();

            const section = this.headers.find(grp => grp.columns.indexOf(sortKey) !== -1);

            if (section === undefined) {
              // eslint-disable-next-line no-console
              console.error('Error: sortKey not found in any header groups', this.headers, sortKey);
            } else {
              const aVal = a[section.attribute][sortKey];
              const bVal = b[section.attribute][sortKey];
              if (aVal < bVal) return -1 * modifier;
              if (aVal > bVal) return 1 * modifier;
            }
          }
        }

        return a[this.keyName].localeCompare(b[this.keyName]) * modifier;
      });
    },
  },
};
</script>
