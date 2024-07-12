document.getElementById('search').addEventListener('click', function() {
    const keywords = document.getElementById('keywords').value;
    
    document.getElementById('results').innerHTML = 'Searching...';
    
    chrome.runtime.sendMessage({
      action: "search",
      keywords: keywords
    });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateResults") {
      displayResults(request.results);
    }
  });

  function displayResults(papers) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    if (papers.length === 0) {
      resultsDiv.innerHTML = 'No papers found.';
      return;
    }
  
    const ul = document.createElement('ul');
    papers.forEach(paper => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="paper-title">${paper.title}</div>
        <div class="paper-authors">Authors: ${paper.authors.map(a => a.name).join(', ')}</div>
        <div class="paper-year">Year: ${paper.year || 'N/A'}</div>
        <a href="${paper.url}" target="_blank" class="view-paper">View Paper</a>
      `;
      ul.appendChild(li);
    });
    
    resultsDiv.appendChild(ul);
  }