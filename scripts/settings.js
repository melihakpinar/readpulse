document.getElementById('save').addEventListener('click', function() {
    const wordsPerMinute = parseInt(document.getElementById('wordsPerMinute').value) || 200;
    console.log(wordsPerMinute);
    chrome.storage.sync.set({ wordsPerMinute: wordsPerMinute }).then((result) => {
        console.log(result);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['wordsPerMinute'], function(result) {
        document.getElementById('wordsPerMinute').value = result.wordsPerMinute || 200;
    });
});
