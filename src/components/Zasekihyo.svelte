<script lang="ts">
  import bgImg from '../assets/zasekihyo.png'
  import config from '../zaseki.json'

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
  <div class="border-4 border-red-500 absolute rounded-sm" style={`left: ${getAxis(seatId, 0)}%; top: ${getAxis(seatId, 1)}%; width: ${getAxis(seatId, 2) - getAxis(seatId, 0)}%; height: ${getAxis(seatId, 3) - getAxis(seatId, 1)}%;`}></div>
  {#if oldSeatId !== undefined}
    <div class="border-[3px] border-red-500 border-dashed absolute rounded-sm" style={`left: ${getAxis(oldSeatId, 0)}%; top: ${getAxis(oldSeatId, 1)}%; width: ${getAxis(oldSeatId, 2) - getAxis(oldSeatId, 0)}%; height: ${getAxis(oldSeatId, 3) - getAxis(oldSeatId, 1)}%;`}></div>
  {/if}
</div>
