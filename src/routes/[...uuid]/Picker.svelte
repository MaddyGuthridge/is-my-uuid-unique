<script lang="ts">
  import { goto } from '$app/navigation';
  import { v4 as uuidV4 } from 'uuid';
  type Props = {
    value: string;
  };

  let { value = $bindable() }: Props = $props();

  function regenerate() {
    value = uuidV4();
  }

  function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    document.location = `/${value}`;
  }
</script>

<form {onsubmit}>
  <input type="text" placeholder="Some UUID" bind:value />

  <div class="row">
    <button class="btn" onclick={regenerate}>Regenerate</button>
    <input
      class="btn"
      type="submit"
      value={value === '' ? 'Go home' : 'Check again'}
    />
  </div>
</form>

<style>
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
