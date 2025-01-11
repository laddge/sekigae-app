<script lang="ts">
  import { seat } from '../lib/seat.svelte'
  import Zasekihyo from '../components/Zasekihyo.svelte'

  interface Props {
    idx: number
    modalOpen: boolean 
  }

  let { idx, modalOpen }: Props = $props()
  let seed = $state('0')
  let oldSeatId = $state<number>()

  $effect(() => {
    if (!modalOpen) {
      setTimeout(() => {
        seed = '0'
        oldSeatId = undefined
      }, 500)
    }
  })

  const shuffle = () => {
    oldSeatId = seat.arr[idx]
    seat.shuffle(seed)
  }
</script>

<input class="modal-state" id="modal-1" bind:checked={modalOpen} type="checkbox" />
<div class="modal">
  <label class="modal-overlay" for="modal-1"></label>
  <div class="modal-content grid gap-6 w-full">
    <label for="modal-1" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
    {#if oldSeatId === undefined}
      <h2 class="text-xl">seedを選択</h2>
      <select bind:value={seed} class="select select-ghost-primary select-block">
        <option value="0">-</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    {:else}
      <h2 class="text-xl">移動</h2>
      <Zasekihyo seatId={seat.arr[idx]} {oldSeatId} />
    {/if}
    <div class="flex gap-3">
      {#if oldSeatId === undefined}
        <label for="modal-1" class="btn btn-block">キャンセル</label>
        <button onclick={shuffle} disabled={seed === '0'} class="btn btn-solid-primary btn-block">席替え</button>
      {:else}
        <label for="modal-1" class="btn btn-block">閉じる</label>
      {/if}
    </div>
  </div>
</div>
