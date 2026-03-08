window.onload = function () {
  const simplifyBtn = document.getElementById("simplify");
  const themeBtn = document.getElementById("theme");
  const hideBtn = document.getElementById("hide");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const stopBtn = document.getElementById("stopBtn");
  const speedControl = document.getElementById("speedControl");

  async function getActiveTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      throw new Error("No active tab found");
    }
    return tab;
  }

  async function ensureContentScript(tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, { action: "ping" });
    } catch (error) {
      await chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"]
      });
    }
  }

  async function sendToActiveTab(message) {
    try {
      const tab = await getActiveTab();
      await ensureContentScript(tab.id);
      await chrome.tabs.sendMessage(tab.id, message);
    } catch (error) {
      console.error("Send message failed:", error);
      alert("Refresh the webpage once and try again.");
    }
  }

  simplifyBtn.addEventListener("click", async () => {
    await sendToActiveTab({ action: "simplify" });
  });

  themeBtn.addEventListener("click", async () => {
    await sendToActiveTab({ action: "theme" });
  });

  hideBtn.addEventListener("click", async () => {
    await sendToActiveTab({ action: "hide" });
  });

  playBtn.addEventListener("click", async () => {
    const speed = parseFloat(speedControl.value) || 1;
    await sendToActiveTab({ action: "read", speed });
  });

  pauseBtn.addEventListener("click", async () => {
    await sendToActiveTab({ action: "pause" });
  });

  stopBtn.addEventListener("click", async () => {
    await sendToActiveTab({ action: "stop" });
  });

  speedControl.addEventListener("change", async () => {
    const speed = parseFloat(speedControl.value) || 1;
    await sendToActiveTab({ action: "speed", speed });
  });
};