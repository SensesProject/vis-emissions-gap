<template>
  <div class="page">
    <header class="page-head">
      <section class="page-header">
        <h1><n-link to="/">Senses</n-link></h1>
        <nav class="page-nav">
          <ul>
            <li><n-link to="/learn">Learn</n-link></li>
            <li><n-link to="/explore">Explore</n-link></li>
            <li><n-link to="/share">Share</n-link></li>
          </ul>
        </nav>
      </section>
      <section class="module-header" v-if="isModule">
        <hgroup>
          <h2>Are we doing enough?</h2>
        </hgroup>
      </section>
    </header>
    <div class="page-content" role="main">
      <nuxt/>
    </div>
    <footer class="page-foot">
      <section class="page-footer">
        <span class="footer">2018 – The SENSES Toolkit is part of the SENSES Project. Visit senses-project.org for more information.</span>
      </section>
    </footer>
  </div>
</template>

<script>
  import get from 'lodash/get'

  export default {
    computed: {
      isModule: function () {
        return get(this.$route, 'name', false) === 'module'
      }
    }
  }
</script>

<style lang="scss">
  @import "~@/assets/style/global";

  .page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    .page-head, .page-foot {
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      section {
        @include grid-basic(12);
        @include wrapper-primary();

        &.page-header {
          grid-template-rows: 100%;
          height: 6vh;
          min-height: 60px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        &.module-header {
          grid-template-rows: 100%;
          height: 10vh;
          min-height: 100px;
        }

        &.page-footer {
          grid-template-rows: 100%;
          height: 4vh;
          min-height: 40px;
        }

        h1 {
          grid-column: 1 / 3;
          align-self: center;
          display: inline;
          margin: 0;
        }

        span {
          grid-column: 3 / 10;
          align-self: center;
        }

        a {
          color: rgb(255, 255, 255);
        }

        nav {
          grid-column: 10 / 13;
          align-self: center;

          ul {
            @include grid-basic(3);

            li {
              text-align: right;

              a {
                color: rgba(255, 255, 255, 0.8);

                &:hover, &.nuxt-link-exact-active {
                  color: rgb(255, 255, 255);
                }

                &.nuxt-link-exact-active {
                  font-weight: 600;
                }
              }
            }
          }
        }

        hgroup {
          grid-column: 1 / 13;
          align-self: center;
        }
      }

      h1 {
        font-size: 24px;
        text-transform: uppercase;
      }
    }

    .page-content {
      background-color: #fff;
      width: 100vw;
      flex: 1;
      display: flex;
    }
  }
</style>
