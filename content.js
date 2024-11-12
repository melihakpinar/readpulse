const elementTimeouts = new WeakMap();
const originalInnerHTMLs = new WeakMap();

function tokenizeHTML(htmlString) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlString, 'text/html');
    let result = [];
    let lengths = [];
    for (let node of doc.body.childNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            result.push(node.outerHTML);
            lengths.push(node.innerHTML.length);
        }
        else if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.trim()) {
                for (let word of node.textContent.split(" ")) {
                    result.push(word);
                    lengths.push(word.length);
                }
            }
        }
    }
    return [result, lengths];
}

document.addEventListener('click', function(event) {
    const tags = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'];
    const target = event.target;
    if (tags.includes(target.nodeName)) {
        // Save original innerHTML
        if (!originalInnerHTMLs.has(target)) {
            originalInnerHTMLs.set(target, target.innerHTML);
        }
        // Clear any existing timeouts
        if (elementTimeouts.has(target)) {
            const timeouts = elementTimeouts.get(target);
            timeouts.forEach(timeout => clearTimeout(timeout));
            elementTimeouts.delete(target);
            target.innerHTML = originalInnerHTMLs.get(target);
        }
        // Get wordsPerMinute and highlightColor through message passing
        chrome.runtime.sendMessage({type: 'getSettings'}, function(response) {
            const wordsPerMinute = response.wordsPerMinute;
            const highlightColor = response.highlightColor;
            const highlightTimeFactor = 10000 / wordsPerMinute;
            let timeout = 0;
            const [tokens, lengths] = tokenizeHTML(target.innerHTML);
            const timeouts = [];
            for (let i = 0; i < tokens.length; i++) {
                const timeoutId = setTimeout(() => {
                    const wordsBefore = tokens.slice(0, i);
                    const wordsAfter = tokens.slice(i + 1);
                    target.innerHTML = wordsBefore.join(' ') + 
                        ` <span style="background-color: ${highlightColor}80;">` + 
                        tokens[i] + '</span> ' + wordsAfter.join(' ');
                }, timeout);
                timeouts.push(timeoutId);
                timeout += lengths[i] * highlightTimeFactor;
            }
            // Add final timeout to reset the text
            const finalTimeoutId = setTimeout(() => {
                target.innerHTML = originalInnerHTMLs.get(target);
                elementTimeouts.delete(target);
                originalInnerHTMLs.delete(target);
            }, timeout);
            timeouts.push(finalTimeoutId);
            // Store all timeouts for this element
            elementTimeouts.set(target, timeouts);
        });
    }
});