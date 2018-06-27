<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-primary">
    <div class="container">
      <a class="navbar-brand" href="/" title="Game Dev Tycoon Helper">GDT Helper</a>
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#topics">Topics</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#platforms">Platforms</a>
          </li>
        </ul>
        <form class="form-inline my-0">
          <div class="input-group mr-sm-3 ">
            <input class="form-control rounded-0"
                   type="search"
                   placeholder="Filter"
                   :value="filter"
                   @input="$emit('update:filter', $event.target.value)"
                   aria-label="Filter">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary"
                      type="button"
                      @click="$emit('reset')">
                <i class="fas fa-undo"></i>
              </button>
              <button class="btn btn-outline-secondary"
                      type="button"
                      @click="$emit('update:currentSortDirAsc', !currentSortDirAsc)">
                <i :class="['fas', sortIcon]"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Helper',
  props: ['filter', 'currentSortDirAsc'],
  computed: {
    sortIcon() {
      return this.currentSortDirAsc ? 'fa-sort-amount-down' : 'fa-sort-amount-up';
    },
  },
};
</script>
