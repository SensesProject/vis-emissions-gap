<template>
  <div class="wrapper">
    <ul>
    	<li>
    		<a>
    			<span>Static graphics from the primer</span><br />
    			<small>PDF/PNG – Creative Common</small>
    		</a>
    	</li>
    	<li>
    		<a>
    			<span>Static graphics from »Are we doing enough?«</span><br />
    			<small>PDF/PNG – Creative Common</small>
    		</a>
    	</li>
    	<li>
    		<a href="https://vimeo.com/232557105">
    			<span>CO2 film ↗</span><br />
    			<small>PDF/PNG – Julian Braun, …</small>
    		</a>
    	</li>
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
