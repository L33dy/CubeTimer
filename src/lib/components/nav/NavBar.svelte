<script lang="ts">
import NavItem from '$lib/components/nav/NavItem.svelte'
</script>

<div class="fixed top-0 left-0 z-50 w-full px-6 py-8">
  <div class="max-w-10xl mx-auto w-full flex items-center gap-6">
    <div class="flex items-center gap-4">
      <a href="/">
        <h1 class="text-3xl font-semibold text-main">CubeTimer.</h1>
      </a>
    </div>
    <nav class="flex items-center gap-5">
      <NavItem href="/" icon="i-[ri--timer-fill]" />
      <NavItem href="/solves" icon="i-[ri--hourglass-fill]" />
      <NavItem href="/stats" icon="i-[ri--pie-chart-2-fill]" />
      <NavItem href="/settings" icon="i-[ri--settings-3-fill]" />
    </nav>
  </div>
</div>
