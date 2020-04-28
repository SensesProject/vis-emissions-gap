<template>
  <div class="page">
    <SensesMenu id="emissions-gap" />
    <div class="page-content" role="main">
      <nuxt />
    </div>
  </div>
</template>

<script>
import get from 'lodash/get'
import SensesMenu from 'library/src/components/SensesMenu.vue'

export default {
  components: {
    SensesMenu
  },
  computed: {
    isModule () {
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
          grid-column: 1 / 5;
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
