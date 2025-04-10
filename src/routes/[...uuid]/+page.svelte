<script lang="ts">
  import { checkUuid } from '$lib';
  import Picker from './Picker.svelte';

  type Props = {
    data: import('./$types').PageData;
  };

  const { data }: Props = $props();

  let uuid = $state(data.uuid);

  let promise = $derived(checkUuid(uuid));

  $effect(() => {
    uuid = data.uuid;
  });
</script>

<h1>Is your UUID really unique?</h1>

<Picker bind:value={uuid} />

{#if data.uuid === ''}
  <p>Find out by entering it above.</p>
{:else}
  {#await promise}
    <p>Give us a sec to load</p>
  {:then result}
    {#if !result.valid}
      <h2>That's not a UUID, silly!</h2>
      <p>Please enter an actual UUID and try again.</p>
    {:else if result.unique}
      <h2>Congrats! Your UUID is unique!</h2>
      <p>Feel free to use this UUID as required.</p>
    {:else}
      <h2>Oh no! Your UUID is taken!</h2>
      <p>Perhaps you should generate a new one instead.</p>
    {/if}
  {/await}
{/if}

<style>
  :root {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
