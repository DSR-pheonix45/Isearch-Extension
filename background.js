chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
      searchPapers(request.keywords);
    }
    return true; // Indicates that the response is asynchronous
  });
  
  async function searchPapers(keywords) {
    const apiUrl = `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(keywords)}&limit=10&fields=title,authors,year,url`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      chrome.runtime.sendMessage({
        action: "updateResults",
        results: data.data
      });
    } catch (error) {
      console.error('Error:', error);
      chrome.runtime.sendMessage({
        action: "updateResults",
        results: []
      });
    }
  }