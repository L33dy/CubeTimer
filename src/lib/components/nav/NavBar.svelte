<script lang="ts">
import { version } from '$app/environment'
import NavItem from '$lib/components/nav/NavItem.svelte'
</script>

<div class="bg-white h-screen fixed top-0 w-[350px] px-6 py-5 flex flex-col shadow-sm">
  <h1 class="text-3xl font-medium bg-gradient-to-r from-violet-500 to-violet-200 text-transparent bg-clip-text">CubeTimer.</h1>
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
  <div class="flex justify-between w-full mt-auto">
    <div class="flex flex-col gap-1.5">
      <small>Built with</small>
      <div class="flex gap-2">
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
    <div class="flex place-self-end">
      <small class="h-fit">ver. {version}</small>
    </div>
  </div>
</div>
