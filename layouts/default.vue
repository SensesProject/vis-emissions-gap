<template>
  <div class="page">
  	<header>
  		<section class="page-header">
	  		<h1>Senses</h1>
	  		<span>← Back to the Toolkit overview</span>
	  		<nav class="page-nav">
	  			<ul>
	  				<li>Learn</li>
	  				<li>Explore</li>
	  				<li>Share</li>
	  			</ul>
	  		</nav>
	  	</section>
	  	<section class="module-header">
	  		<hgroup>
	  			<h6>Module</h6>
	  			<h2>Are we doing enough?</h2>
	  			<h4>How do decarbonization efforts relate the Paris Agreement?</h4>
	  		</hgroup>
	  	</section>
  	</header>
    <div class="page-content" role="main">
      <nuxt/>
    </div>
    <footer>
    	<section class="page-footer">
    		<span class="footer">2018 – The SENSES Toolkit is part of the SENSES Project. Visit senses-project.org for more information.</span>
    	</section>
    </footer>
  </div>
</template>

<style lang="scss">
	@import "~@/assets/style/global";

	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		header, footer {
			color: #fff;
			display: flex;
			flex-direction: column;
		  align-items: center;
		  justify-content: center;

			section {
				@include grid-basic(12);
				@include wrapper-primary();

				&.page-header {
					grid-template-rows: 6vh;
					border-bottom: 1px solid rgba(255, 255, 255, 0.2);
				}

				&.module-header {
					grid-template-rows: 14vh;
				}

				&.page-footer {
					grid-template-rows: 6vh;
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

				nav {
					grid-column: 10 / 13;
					align-self: center;

					ul {
						@include grid-basic(3);

						li {
							text-align: right;
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
