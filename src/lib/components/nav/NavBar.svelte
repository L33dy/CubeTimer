<script lang="ts">
import { version } from '$app/environment'
import NavItem from '$lib/components/nav/NavItem.svelte'
import CTLabel from '$lib/components/cubetime/CTLabel.svelte'
</script>

<div class="bg-white h-screen fixed top-0 w-[350px] px-6 py-5 flex flex-col shadow-sm">
  <div class="flex items-center gap-4">
    <h1 class="text-3xl font-semibold bg-gradient-to-r from-violet-500 to-violet-300 text-transparent bg-clip-text">CubeTimer.</h1>
    <CTLabel>
      v{version}
    </CTLabel>
  </div>
  <nav class="w-full flex flex-col justify-start items-start gap-5 mt-10 ml-3">
    <NavItem href="/" icon="i-[mdi--stopwatch]">
      Timer
    </NavItem>
    <NavItem href="/solves" icon="i-[f7--hourglass-bottomhalf-fill]">
      Solves
    </NavItem>
    <NavItem href="/stats" icon="i-[f7--chart-pie-fill]">
      Stats
    </NavItem>
    <NavItem href="/settings" icon="i-[mingcute--settings-3-fill]">
      Settings
    </NavItem>
  </nav>
  <div class="flex justify-center w-full mt-auto">
    <div class="flex flex-col items-center gap-2">
      <small>Built with</small>
      <div class="flex gap-4">
        <a aria-label="Svelte" href="https://svelte.dev/" target="_blank">
          <span class="i-[devicon--svelte] text-lg"></span>
        </a>
        <a aria-label="Tailwind CSS" href="https://tailwindcss.com" target="_blank">
          <span class="i-[devicon--tailwindcss] text-lg"></span>
        </a>
        <a aria-label="Typescript" href="https://typescriptlang.org" target="_blank">
          <span class="i-[devicon--typescript] text-lg"></span>
        </a>
      </div>
    </div>
  </div>
</div>
