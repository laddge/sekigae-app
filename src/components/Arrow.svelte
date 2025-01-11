<script lang="ts">
  import config from '../zaseki.json'

  interface Props {
    axis: number[][]
  }

  let { axis }: Props = $props()
  let points = $derived([
    [(axis[0][0] + axis[0][2]) / 2, (axis[0][1] + axis[0][3]) / 2],
    [(axis[1][0] + axis[1][2]) / 2, (axis[1][1] + axis[1][3]) / 2],
  ])
  let length = $derived(((points[1][0] - points[0][0]) ** 2 + (points[1][1] - points[0][1]) ** 2) ** .5 - 1.5)
  let rotate = $derived(Math.atan2(points[1][1] - points[0][1], points[1][0] - points[0][0]))
</script>

<div class="absolute flex justify-center items-center" style={`width: ${length / config.size[0] * 100}%; height: ${2 / config.size[1] * 50}%; left: ${(points[0][0] + points[1][0]) / 2 / config.size[0] * 100}%; top: ${(points[0][1] + points[1][1]) / 2 / config.size[1] * 100}%; transform: translate(-50%, -50%) rotate(${rotate}rad);`}>
  <div class="bg-red-500 w-full h-1/3"></div>
  <div class="bg-red-500 h-full aspect-square" style="clip-path: polygon(0% 0,100% 50%,0 100%);"></div>
</div>
