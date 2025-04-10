<script lang="ts">
  import { goto } from '$app/navigation';
  import { v4 as uuidV4 } from 'uuid';
  type Props = {
    value: string;
  };

  let { value = $bindable() }: Props = $props();

  function regenerate(e: MouseEvent) {
    e.preventDefault();
    value = uuidV4();
  }

  function onsubmit(e: SubmitEvent) {
    e.preventDefault();
    void goto(`/${value}`, { invalidateAll: true });
  }
</script>

<form {onsubmit}>
  <input type="text" placeholder="Some UUID" bind:value />

  <button onclick={regenerate}>Regenerate</button>
  <input type="submit" value={value === '' ? 'Go home' : 'Check'} />
</form>
