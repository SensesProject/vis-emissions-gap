<template>
  <div class="wrapper">
    <h1>The SENSES Toolkit helps you understand and communicate climate change scenarios</h1>
    <ul>
    	<li class="learn"><n-link to="/learn">Learn<br /><small>to work with scenarios</small></n-link></li>
    	<li class="explore"><n-link to="/explore">Explore<br /><small>datasets and databases</small></n-link></li>
    	<li class="share"><n-link to="/share">Share<br /><small>knowledge and insights</small></n-link></li>
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
  	@include center();
    @include wrapper-primary();
    @include grid-basic(12);

    grid-template-rows: 30vh 20vh;

    h1 {
      grid-column: 3 / 12;
      margin: 0;
      font-size: 3rem;
    }

    ul {
    	grid-column: 3 / 12;
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
          font-size: 2rem;
          line-height: 1;

          small {
            font-size: 0.6em;
          }

    			&:hover {
    				background-color: $color-green;
    				color: #fff;
    			}
    		}
    	}
    }
  }

</style>
