<script lang="ts">
    import { storage } from "../storage";
    import { onMount } from "svelte";
    import "../css/app.css";

    let count = 0;
    let successMessage: string = null;

    onMount(async () => {
        const st = await storage.get()
        count = st.count
    });

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }

    async function save() {
        await storage.set({ count })
        successMessage = "Options saved!";

        setTimeout(() => {
            successMessage = null;
        }, 1500);
    }
</script>

<div class="min-w-[250px]">
    <p>Current count: <b>{count}</b></p>
    <div>
        <button class="btn" on:click={decrement}>-</button>
        <button class="btn" on:click={increment}>+</button>
        <button class="btn" on:click={save}>Save</button>
        {#if successMessage}<span class="text-emerald-400 font-bold">{successMessage}</span>{/if}
    </div>
</div>

<style>
    .btn {
        @apply rounded border-none shadow-md text-white px-2 py-1 bg-emerald-400;
    }
    .btn:hover {
      @apply bg-emerald-500;
    }
</style>
