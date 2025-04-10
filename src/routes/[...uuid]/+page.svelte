<script lang="ts">
  import { goto } from '$app/navigation';
  import { checkUuid } from '$lib';
  import { v4 as uuidV4 } from 'uuid';

  type Props = {
    data: import('./$types').PageData;
  };

  const { data }: Props = $props();

  let uuid = $state(data.uuid);

  let promise: Promise<{
    unique: boolean;
    valid: boolean;
    uuid: string;
  }> = $state(Promise.resolve({} as any));

  $effect(() => {
    uuid = data.uuid;
    promise = checkUuid(data.uuid);
  });

  function regenerate() {
    uuid = uuidV4();
  }

  function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    if (uuid === data.uuid) {
      // Re-check
      promise = checkUuid(data.uuid);
    } else {
      goto(`/${uuid}`);
    }
  }

  const title = $derived(
    uuid === '' ? 'Is your UUID unique?' : `Is the UUID "${uuid}" unique?`,
  );
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="author" content="Maddy Guthridge">
  {#if uuid === ''}
    <meta
      name="description"
      content="Test your UUIDs to discover is they are truly unique using this simple and user-friendly website."
    />
  {:else}
    <meta
      name="description"
      content='Find out if the UUID "{uuid}" really is universally unique by checking it using this simple and user-friendly website.'
    />
  {/if}
</svelte:head>

<h1>{title}</h1>

<form {onsubmit}>
  <input type="text" placeholder="Some UUID" bind:value={uuid} />

  <div class="row">
    <button class="btn" onclick={regenerate}>Regenerate</button>
    <input class="btn" type="submit" value="Check again" />
  </div>
</form>

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
  form {
    max-width: 59rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  input[type='text'] {
    width: 100%;
    font-size: 3rem;
  }
  .row {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .btn {
    background-color: rgb(180, 180, 255);
    border: blue;
    border-radius: 10px;
    font-size: 2rem;
    padding: 0.5rem 1rem;
  }

  .btn:hover {
    background-color: rgb(132, 132, 255);
    cursor: pointer;
  }
</style>
