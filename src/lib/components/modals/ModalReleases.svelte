<script lang="ts">
import type { ReleasesModal } from '$packages/modal/types'

let modal: ReleasesModal = $props()

function fetchReleases(): Promise<Response> {
  return fetch('https://api.github.com/repos/L33dy/CubeTimer/releases?per_page=5')
}

fetchReleases()
</script>
