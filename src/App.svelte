<script lang="ts">
  import { onMount } from 'svelte'
  import { counter, seat } from './lib/seat.svelte'
  import Zasekihyo from './components/Zasekihyo.svelte'
  import Modal from './components/Modal.svelte'

  const seatCount = 63
  let idx = $state<number>()
  let modalOpen = $state(false)

  onMount(() => {
    const paramIdx = parseInt((new URLSearchParams(location.search)).get('idx') || '')
    if (0 <= paramIdx && paramIdx < seatCount) {
      idx = paramIdx
    }
    seat.load(seatCount)
  })
</script>

<div class="flex flex-col h-screen" style="height: 100dvh;">
  <div class="navbar border-b shadow-none z-10">
    <div class="navbar-start">
      <p class="p-2">席替えアプリ</p>
    </div>
    <div class="navbar-end">
      <div class="dropdown">
        <label><button class="btn btn-solid-secondary btn-sm">席替え回数: {counter.count}</button></label>
        <div class="dropdown-menu p-2">
          <button onclick={seat.reset} class="btn btn-error btn-sm">リセット</button>
        </div>
      </div>
    </div>
  </div>
  <div class="grow bg-backgroundSecondary flex justify-center items-center text-xl">
    {#if idx !== undefined}
      <Zasekihyo seatId={seat.arr[idx]} />
      <Modal {idx} {modalOpen} />
    {/if}
  </div>
  <div class="p-4 border-t">
    <label class="btn btn-solid-primary btn-block" for="modal-1">席替え</label>
  </div>
</div>
