<script lang="ts">
import { page } from '$app/state'
</script>

<div class="w-3/4 mx-auto">
  <div class="flex flex-col justify-start items-start gap-12">
    <div class="w-full flex flex-col justify-center items-start gap-4">
      <h1>About.</h1>
      <p>CubeTimer is an open source timing program for Rubik's cube speedsolvers. It was created with the meaning
        of more modern alternative to the popular csTimer. CubeTimer saves your scrambleData locally on the browser cache
        and also provides an API for generating the scrambles.</p>
    </div>
    <div class="w-full flex flex-col justify-center items-start gap-4">
      <h1>How to use the API.</h1>
      <p>CubeTimer provides a simple REST API that generates and returns a scramble based on the given parameters.
        Below is
        documentation on
        examples to check out on how to use the API.</p>
    </div>
  </div>

  <div class="w-full flex flex-col justify-center items-start gap-20 mt-24">
    <div class="flex flex-col justify-center items-start gap-4 w-full">
      <h2 class="font-medium text-lg">Get a scramble</h2>
      <code class="bg-gray-300 rounded-lg w-full px-12 py-6 whitespace-pre-line leading-8">
        fetch("{page.url.origin}/api")
        &emsp;.then((res) => res.text())
        &emsp;.then((scrambleData) => console.log(scrambleData))
      </code>
    </div>
    <div class="flex flex-col justify-center items-start gap-4 w-full">
      <h2 class="font-medium text-lg">Change the cube type</h2>
      <code class="bg-gray-300 rounded-lg w-full px-12 py-6 whitespace-pre-line leading-8">
        fetch("{page.url.origin}/api?type=2x2")
        &emsp;.then((res) => res.text())
        &emsp;.then((scrambleData) => console.log(scrambleData))
      </code>
      <p class="info">Normally, the API returns a scramble for 3x3x3 cube. You can change the puzzle type by passing a type parameter. <br><br>
        Available types: <b>3x3, 2x2, 4x4, 5x5, 6x6, 7x7, pyraminx, megaminx, skewb, clock</b></p>
    </div>
    <div class="flex flex-col justify-center items-start gap-4 w-full">
      <h2 class="font-medium text-lg">Get a list of types</h2>
      <code class="bg-gray-300 rounded-lg w-full px-12 py-6 whitespace-pre-line leading-8">
        fetch("{page.url.origin}/api/types")
        &emsp;.then((res) => res.json())
        &emsp;.then((scrambleData) => console.log(scrambleData))
      </code>
      <p class="info">
        Returns a JSON with an array containing all available scramble types that can be used.
      </p>
    </div>
  </div>
</div>

<style lang="postcss">
    h1 {
        @apply text-2xl text-violet-500 font-medium;
    }

    .info {
        @apply border-l-4 border-l-violet-400 pl-4;
    }
</style>
