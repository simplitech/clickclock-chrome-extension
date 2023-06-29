import Options from "../components/Options.svelte";

console.log("Content script loaded");

const waitForElm = (selector) => {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            resolve(document.querySelector(selector));
            return
        }

        setTimeout(() => {
            resolve(waitForElm(selector))
        }, 500);
    });
}

waitForElm(".cu-float-button__toggle-simple").then((elm: HTMLElement) => {
    const [prevTools] = document.body.getElementsByClassName("simpli-clickclock")
    if (prevTools) {
        prevTools.remove()
    }

    const toolsDiv = document.createElement('div')
    toolsDiv.className = "simpli-clickclock"
    elm.prepend(toolsDiv)

    new Options({ target: toolsDiv });
});
