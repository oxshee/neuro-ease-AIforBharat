chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "simplify_api") {
    simplifyWithAPI(msg.text)
      .then((simplifiedText) => {
        sendResponse({ success: true, simplifiedText });
      })
      .catch((error) => {
        console.error("Background simplify error:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true;
  }
});

async function simplifyWithAPI(text) {
  const response = await fetch("https://0dpx2qh3ng.execute-api.us-east-1.amazonaws.com/prod/simplify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  const rawText = await response.text();

  let data = {};
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    throw new Error(`Non-JSON response: ${rawText}`);
  }

  if (!response.ok) {
    throw new Error(data.error || `HTTP error: ${response.status}`);
  }

  return data.simplifiedText || text;
}