<template>
  <div class="table-responsive mb-5">
    <a
      :id="anchorName"
      class="headerOffsetAnchor"
    />

    <form class="form-inline float-right mb-2">
      <div class="input-group">
        <input
          v-model="filter"
          class="form-control rounded-0"
          type="search"
          placeholder="Filter"
          aria-label="Filter"
        >
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="reset"
          >
            <i class="fas fa-undo" />
          </button>
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="currentSortDirAsc = !currentSortDirAsc"
          >
            <i :class="['fas', sortIcon]" />
          </button>
        </div>
      </div>
    </form>

    <h2>{{ title }}</h2>

    <table class="table table-sm table-bordered">
      <thead>
        <th class="border-top-0 border-left-0" />

        <template
          v-for="(headerGroup, index) in headers"
        >
          <th
            v-if="index > 0"
            :key="'th1_' + index"
            class="border-bottom-0 border-top-0"
          />
          <th
            :key="'headerGroup' + index"
            scope="col"
            class="text-center border-bottom-0"
            :colspan="headerGroup.columns.length"
          >
            {{ headerGroup.title }}
          </th>
        </template>
      </thead>
      <thead>
        <th
          scope="col"
          :class="currentSort.length === 0 ? 'table-info' : ''"
        >
          {{ title }}
        </th>

        <template
          v-for="(headerGroup, index) in headers"
        >
          <th
            v-if="index > 0"
            :key="'th2_spacer' + index"
            class="border-bottom-0 border-top-0"
          />
          <th
            v-for="colTitle in headerGroup.columns"
            :key="colTitle"
            scope="col"
            :class="[
              'text-center',
              'rotated',
              currentSort.indexOf(colTitle) !== -1 ? 'table-info' : ''
            ]"
            @click="sort(colTitle)"
          >
            <div>{{ colTitle }}</div>
          </th>
        </template>
      </thead>

      <tbody>
        <tr
          v-for="row in sortedRows"
          :key="row[keyName]"
        >
          <th scope="row">
            {{ row[keyName] }}
          </th>

          <template
            v-for="(headerGroup, index) in headers"
          >
            <td
              v-if="index > 0"
              :key="'td_spacer' + index"
            />
            <td
              v-for="colTitle in headerGroup.columns"
              :key="row[keyName] + colTitle"
              scope="row"
              :class="['text-center',cellClass(row[headerGroup.attribute][colTitle])]"
            >
              {{ row[headerGroup.attribute][colTitle] }}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SortableTable',
  props: {
    title: { type: String, default: '' },
    headers: { type: Array, default: () => [] },
    rows: { type: Array, default: () => [] },
    keyName: { type: String, required: true },
    anchorName: { type: String, default: '' },
  },
  data() {
    return {
      currentSort: [],
      currentSortDirAsc: true,
      filter: '',
    };
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
};
</script>
