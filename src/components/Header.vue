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

          <li class="nav-item">
            <a class="nav-link" href="#single_genre_focus">Single Genre Focus</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#multi_genre_focus">Multiple Genre Focus</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Helper',
};
</script>
