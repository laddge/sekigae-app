<script lang="ts">
  import { onMount } from 'svelte'
  import { seat } from './lib/seat.svelte'

  const seatCount = 64
  let idx = $state<number>()
  let seed = $state('0')
  let modalOpen = $state(false)

  const closeModal = () => {
    modalOpen = false
    seed = '0'
  }

  const shuffle = () => {
    seat.shuffle(seed)
    modalOpen = false
    seed = '0'
  }

  onMount(() => {
    const paramIdx = parseInt((new URLSearchParams(location.search)).get('idx') || '')
    if (0 <= paramIdx && paramIdx <= seatCount) {
      idx = paramIdx
    }
    seat.init(seatCount)
  })
</script>

<div class="flex flex-col h-screen h-[100dvh]">
  <div class="navbar border-b shadow-none z-10">
    <div class="navbar-start">
      <p class="p-2">席替えアプリ</p>
    </div>
    <div class="navbar-end">
      <p class="p-2">idx: {idx}</p>
    </div>
  </div>
  <div class="grow bg-backgroundSecondary flex justify-center items-center text-xl">
    席番号: {idx === undefined ? '' : seat.arr[idx] }
    <input class="modal-state" id="modal-1" bind:checked={modalOpen} type="checkbox" />
    <div class="modal">
      <label class="modal-overlay" for="modal-1"></label>
      <div class="modal-content grid gap-6 w-full">
        <button onclick={closeModal} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
        <div class="flex gap-3">
          <button onclick={closeModal} class="btn btn-block">キャンセル</button>
          <button onclick={shuffle} disabled={seed === '0'} class="btn btn-solid-primary btn-block">席替え</button>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4 border-t">
    <label class="btn btn-solid-primary btn-block" for="modal-1">席替え</label>
  </div>
</div>
