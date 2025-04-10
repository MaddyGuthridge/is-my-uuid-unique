<script lang="ts">
  import Picker from '../Picker.svelte';

  type Props = {
    data: import('./$types').PageData;
  };

  const { data }: Props = $props();

  let uuid = $state(data.uuid);

  $effect(() => {
    uuid = data.uuid;
  })
</script>

{#if !data.valid}
  <h1>That's not a UUID, silly!</h1>
  <p>Please enter an actual UUID and try again.</p>
{:else if data.unique}
  <h1>Congrats! Your UUID is unique!</h1>
  <p>Feel free to use this UUID as required.</p>
{:else}
  <h1>Oh no! Your UUID is taken!</h1>
  <p>Perhaps you should generate a new one instead.</p>
{/if}

<Picker bind:value={uuid} />
