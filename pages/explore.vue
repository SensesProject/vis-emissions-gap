<template>
  <div class="wrapper">
    <ul>
      <li><a href="https://data.ene.iiasa.ac.at/iamc-1.5c-explorer//#/workspaces/share/1a6e44c8-0963-4f28-a871-2b81bfb11def">IIASA Database Workspace:<br>PEP Emissions by major economies ↗</a></li>
      <li><a href="https://data.ene.iiasa.ac.at/iamc-1.5c-explorer//#/workspaces/share/72616295-1050-4c7c-a53f-8b584a8f09c0">IIASA Database Workspace:<br>PEP Emissions by sectors ↗</a></li>
      <li><a href="https://data.ene.iiasa.ac.at/iamc-1.5c-explorer///#/workspaces/share/188de379-7e97-49c9-abb0-59d8bf8b4513">IIASA Database Workspace:<br>PEP Primary Energy ↗</a></li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/global";

  .wrapper {
    @include wrapper-primary();
    @include grid-basic(12);
    margin-top: $spacing * 2;

    ul {
      grid-column: 1 / 13;
      @include grid-basic(3);

      li {
        text-align: center;

        a {
          display: block;
          padding: $spacing * 2 0;
          background-color: rgba(0, 0, 0, 0.05);
          color: $color-green;
          font-weight: 600;
          transition: all 0.5s;

          &:hover {
            background-color: $color-green;
            color: #fff;
          }
        }
      }
    }
  }

</style>
