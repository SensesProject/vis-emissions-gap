<template>
  <div class="wrapper">
    <ul>
    	<li><n-link to="/module">Are we doing enough?</n-link></li>
      <li><a href="https://www.climatescenarios.org/primer">Primer</a></li>
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
