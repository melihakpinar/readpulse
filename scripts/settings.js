document.getElementById('save').addEventListener('click', function() {
    const wordsPerMinute = parseInt(document.getElementById('wordsPerMinute').value) || 200;
    const highlightColor = document.getElementById('highlightColor').value;
    
    chrome.storage.sync.set({ 
        wordsPerMinute: wordsPerMinute,
        highlightColor: highlightColor 
    }).then((result) => {
        console.log(result);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['wordsPerMinute', 'highlightColor'], function(result) {
        document.getElementById('wordsPerMinute').value = result.wordsPerMinute || 200;
        document.getElementById('highlightColor').value = result.highlightColor || '#ffc878';
    });
});
