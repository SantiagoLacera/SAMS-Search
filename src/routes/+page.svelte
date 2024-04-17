<script lang="ts">
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import SectionWrapper from '../components/SectionWrapper.svelte';
</script>

<SectionWrapper>
	<main>
		<Header />
		<div
			class="hero min-h-screen text-primary-content"
			style="background-image: url(https://mma.prnewswire.com/media/1163548/Westgate_Resorts_Logo.jpg?p=facebook);"
		>
			<div class="hero-overlay bg-opacity-70" />
			<div class="hero-content text-center">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl font-bold">Welcome!!!</h1>
					<p class="mb-5 text-lg">
						This site will allow you to search for gifts or managers. Click on the links in the
						header to get started. If you have any questions, please contact the site administrator
						(Santiago Lacera).
					</p>
				</div>
				<div />
			</div>
		</div>
		<Footer />
	</main>
</SectionWrapper>
