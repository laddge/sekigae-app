<script lang="ts">
  import bgImg from '../assets/zasekihyo.png'
  import config from '../zaseki.json'
  import Arrow from './Arrow.svelte'

  interface Props {
    seatId: number
    oldSeatId?: number
  }

  let { seatId, oldSeatId }: Props = $props()

  const getAxis = (n:number, i: number) => {
    return config.seats[n][i] / config.size[i % 2] * 100
  }
</script>

<div class="relative w-full bg-cover" style={`background-image: url(${bgImg}); aspect-ratio: ${config.size[0]} / ${config.size[1]};`}>
  {#if oldSeatId === undefined}
    <div class="border-4 border-red-500 absolute rounded-sm" style={`left: ${getAxis(seatId, 0)}%; top: ${getAxis(seatId, 1)}%; width: ${getAxis(seatId, 2) - getAxis(seatId, 0)}%; height: ${getAxis(seatId, 3) - getAxis(seatId, 1)}%;`}></div>
  {:else}
    <div class="border-[3px] border-red-500 absolute rounded-sm animate-blink" style={`left: ${getAxis(seatId, 0)}%; top: ${getAxis(seatId, 1)}%; width: ${getAxis(seatId, 2) - getAxis(seatId, 0)}%; height: ${getAxis(seatId, 3) - getAxis(seatId, 1)}%;`}></div>
    <div class="border-[3px] border-red-500 border-dashed absolute rounded-sm" style={`left: ${getAxis(oldSeatId, 0)}%; top: ${getAxis(oldSeatId, 1)}%; width: ${getAxis(oldSeatId, 2) - getAxis(oldSeatId, 0)}%; height: ${getAxis(oldSeatId, 3) - getAxis(oldSeatId, 1)}%;`}></div>
    <Arrow axis={[config.seats[oldSeatId], config.seats[seatId]]} />
  {/if}
</div>

<style>
  .animate-blink {
    animation: blink 1s linear infinite;
  }

  @keyframes blink {
    0%, 15%, 85%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
