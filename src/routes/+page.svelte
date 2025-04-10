<script lang="ts">
  import Picker from './Picker.svelte';

  let value = '';
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>

<Picker bind:value />
