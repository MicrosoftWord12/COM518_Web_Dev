
document.getElementById("yurr")?.addEventListener("click", (element: PointerEvent) => {
    const div = element.currentTarget as HTMLDivElement

    console.log(div.innerText)
})