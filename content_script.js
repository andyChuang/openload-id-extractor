$(window).click(function(e) {
    var x = e.clientX, y = e.clientY,
        elementMouseIsOver = document.elementFromPoint(x, y);

    console.log(elementMouseIsOver);
    copyToClipboard(parseOpenloadId(elementMouseIsOver));
});

function parseOpenloadId(){
	return "abcde";
}

function copyToClipboard(text) {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}