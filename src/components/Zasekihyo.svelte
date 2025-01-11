<script lang="ts">
  import bgImg from '../assets/zasekihyo.png'
  import config from '../zaseki.json'

  let { seatId } = $props()

  const getAxis = (i: number) => {
    return config.seats[seatId][i] / config.size[i % 2] * 100
  }
</script>

<div class="relative w-full bg-cover" style={`background-image: url(${bgImg}); aspect-ratio: ${config.size[0]} / ${config.size[1]};`}>
  <div class="border-4 border-red-500 absolute rounded-sm" style={`left: ${getAxis(0)}%; top: ${getAxis(1)}%; width: ${getAxis(2) - getAxis(0)}%; height: ${getAxis(3) - getAxis(1)}%;`}></div>
</div>
