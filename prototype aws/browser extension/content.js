let currentSpeech = null;
let speechRate = 1;

let calmModeOn = false;
let calmModeOriginal = {
  mediaElements: []
};

let distractionModeOn = false;
let hiddenDistractionElements = [];
let originalBodyOverflow = "";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

  if (msg.action === "simplify") simplifyText();
  if (msg.action === "theme") applyCalmTheme();
  if (msg.action === "hide") hideDistractions();
  if (msg.action === "read") startReading(msg.speed);
  if (msg.action === "pause") pauseReading();
  if (msg.action === "stop") stopReading();
  if (msg.action === "speed") changeSpeed(msg.speed);

});


async function simplifyText() {

  const paragraphs = document.querySelectorAll("p");

  let changedCount = 0;
  let failedCount = 0;

  for (const p of paragraphs) {

    const originalText = p.innerText.trim();

    if (!originalText) continue;
    if (originalText.length < 25) continue;
    if (originalText.length > 4000) continue;
    if (p.dataset.neuroSimplified === "true") continue;

    try {

      p.style.opacity = "0.6";

      const result = await chrome.runtime.sendMessage({
        action: "simplify_api",
        text: originalText
      });

      if (!result || !result.success) {
        throw new Error(result?.error || "Simplification failed");
      }

      if (result.simplifiedText && result.simplifiedText !== originalText) {

        p.innerText = result.simplifiedText;
        p.style.background = "#fff8dc";
        p.dataset.neuroSimplified = "true";

        changedCount++;
      }

      p.style.opacity = "1";

    } catch (error) {

      console.error("Simplification failed:", error);
      p.style.opacity = "1";
      failedCount++;

    }

  }

  alert(`Simplified paragraphs: ${changedCount}\nFailed paragraphs: ${failedCount}`);

}


function applyCalmTheme() {

  if (!calmModeOn) {

    calmModeOriginal.mediaElements = [];

    const movingMedia = document.querySelectorAll("video, iframe");
    const gifs = document.querySelectorAll("img[src*='.gif']");

    movingMedia.forEach((el) => {

      calmModeOriginal.mediaElements.push({
        element: el,
        originalDisplay: el.style.display
      });

      el.style.display = "none";

    });

    gifs.forEach((el) => {

      calmModeOriginal.mediaElements.push({
        element: el,
        originalDisplay: el.style.display
      });

      el.style.display = "none";

    });

    calmModeOn = true;

    alert("Calm mode enabled. Moving images hidden.");

  }

  else {

    calmModeOriginal.mediaElements.forEach((item) => {

      item.element.style.display = item.originalDisplay;

    });

    calmModeOriginal.mediaElements = [];

    calmModeOn = false;

    alert("Calm mode disabled.");

  }

}


function hideDistractions() {

  if (!distractionModeOn) {

    hiddenDistractionElements = [];

    const distractingElements = document.querySelectorAll(
      "aside, nav, footer, header, .ad, .ads, .popup, .banner, .sidebar, .modal, [role='banner'], [role='complementary']"
    );

    distractingElements.forEach((el) => {

      hiddenDistractionElements.push({
        element: el,
        originalDisplay: el.style.display
      });

      el.style.display = "none";

    });

    originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";

    distractionModeOn = true;

    alert("Distraction mode enabled. Click Hide Distractions again to restore the page.");

  }

  else {

    hiddenDistractionElements.forEach((item) => {

      item.element.style.display = item.originalDisplay;

    });

    hiddenDistractionElements = [];

    document.body.style.overflow = originalBodyOverflow;

    distractionModeOn = false;

    alert("Page restored to normal.");

  }

}


function startReading(speed = 1) {

  stopReading();

  speechRate = speed || 1;

  const text = document.body.innerText;

  currentSpeech = new SpeechSynthesisUtterance(text);
  currentSpeech.rate = speechRate;

  speechSynthesis.speak(currentSpeech);

}


function pauseReading() {

  speechSynthesis.pause();

}


function stopReading() {

  speechSynthesis.cancel();
  currentSpeech = null;

}


function changeSpeed(speed) {

  speechRate = speed;

  if (speechSynthesis.speaking) {

    stopReading();
    startReading(speechRate);

  }

}