<script lang="ts">
    import "../css/app.css";
    import Toastify from 'toastify-js'
    import 'toastify-js/src/toastify.css'
    import CopyToClipboardIcon from './icons/CopyToClipboardIcon.svelte'

    function extractContentToCopy() {
        const [taskContainer] = document.body.getElementsByClassName("task-container") as HTMLCollectionOf<Element>
        if (taskContainer) {
            const id = taskContainer.getAttribute("data-task-id")
            const title = (taskContainer.querySelector("textarea.task-name") as HTMLTextAreaElement).value
            return `CU-${id} - ${title}`
        }
        const rowsSelected = document.body.getElementsByClassName("cu-task-row_selected")
        if (rowsSelected.length) {
            const tasks = []
            for (let row of rowsSelected) {
                const id = row.getAttribute("data-id")
                const title = row.querySelector("span.cu-task-row-main__link-text-inner").innerHTML
                tasks.push(`CU-${id} - ${title}`)
            }
            return tasks.join("\n")
        }
        throw new Error("Could not extract content to copy 😢")
    }

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text).then(() => Toastify({ text: 'Copied to clipboard 😘', duration: 2000, style: { background: 'MediumSeaGreen' } }).showToast())
    }

    function handleCopy() {
        try {
            const contentToCopy = extractContentToCopy()
            copyToClipboard(contentToCopy)
        } catch (e) {
            Toastify({ text: e.message, duration: 2000, style: { background: 'IndianRed' } }).showToast()
        }
        
    }
</script>

<div class="min-w-[250px] flex flex-row items-center">
    <button class='flex relative items-center justify-center rounded-[10px] w-[32px] h-[32px] cursor-pointer mr-2 bg-deeppink' on:click|preventDefault={handleCopy}> 
        <CopyToClipboardIcon class="m-[10px]" />
    </button>
</div>
