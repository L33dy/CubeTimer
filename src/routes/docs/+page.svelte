<script>
    import {page} from "$app/stores";
</script>

<div class="flex flex-col justify-start items-start gap-12">
    <div class="w-full flex flex-col justify-center items-start gap-4">
        <h1 class="font-poetsen uppercase text-3xl">ABOUT</h1>
        <p>CubeTimer is an open source timing program for Rubik's cube speedsolvers. It saves your data locally on the browser cache and also provides an API for generating the scrambles.</p>
    </div>
    <div class="w-full flex flex-col justify-center items-start gap-4">
        <h1 class="font-poetsen uppercase text-3xl">How to use the API</h1>
        <p>CubeTimer provides a simple API that generates and returns a scramble based on the given parameters. Below is
            documentation on
            examples to check out on how to use the API.</p>
    </div>
</div>

<div class="w-full flex flex-col justify-center items-start gap-20 mt-24">
    <div class="flex flex-col justify-center items-start gap-4 w-full">
        <h2 class="font-medium text-lg">Get a scramble</h2>
        <code class="bg-gray-300 rounded-lg w-full px-12 py-6 whitespace-pre-line leading-8">
            fetch("{$page.url.origin}/api")
            &emsp;.then((res) => res.text())
            &emsp;.then((data) => console.log(data))
        </code>
    </div>
    <div class="flex flex-col justify-center items-start gap-4 w-full">
        <h2 class="font-medium text-lg">Change the number of moves</h2>
        <code class="bg-gray-300 rounded-lg w-full px-12 py-6 whitespace-pre-line leading-8">
            fetch("{$page.url.origin}/api?length=20")
            &emsp;.then((res) => res.text())
            &emsp;.then((data) => console.log(data))
        </code>
        <p class="border-l-4 border-l-purple-400 pl-4">Normally, the API generates a scramble of 10 moves. You can
            change this number by passing a length parameter.</p>
    </div>
</div>
