let quotes = [
  "Push harder than yesterday if you want a different tomorrow.",
  "Small steps every day lead to big results.",
  "Your body can stand almost anything. It’s your mind you have to convince.",
  "Consistency is the key to success.",
  "The pain you feel today will be the strength you feel tomorrow."
];

let extraTasks = [
  "🧘 Try 5 mins meditation.",
  "🚴 Cycle for 10 mins.",
  "🛌 Get at least 7 hours sleep.",
  "📖 Read something inspiring.",
  "🧃 Have a healthy smoothie."
];

// Helper to show temporary feedback
function showTempMessage(element, message, duration = 1500) {
  element.textContent = message;
  element.style.background = "#e3f2fd";
  element.style.borderRadius = "8px";
  setTimeout(() => {
    element.textContent = "";
    element.style.background = "";
  }, duration);
}

// Generate daily plan
function generatePlan() {
  let weight = parseInt(document.getElementById("userWeight").value);
  let target = parseInt(document.getElementById("targetWeight").value);
  let activity = document.getElementById("activityLevel").value;
  let challengeList = document.getElementById("challengeList");
  challengeList.innerHTML = "";

  // Input validation
  if (isNaN(weight) || isNaN(target)) {
    showTempMessage(challengeList, "⚠️ Please enter both weights.", 2000);
    return;
  }

  let tasks = [];

  if (weight > target) {
    tasks.push("🏃 25 mins brisk walk");
    tasks.push("🥗 Eat under 1800 calories");
    tasks.push("💧 Drink at least 2.5L water");
  } else if (weight < target) {
    tasks.push("🏋️ 30 mins strength training");
    tasks.push("🍗 Eat at least 2500 calories with protein focus");
    tasks.push("💧 Drink at least 3L water");
  } else {
    tasks.push("🧘 15 mins stretching or yoga");
    tasks.push("🥦 Balanced diet around 2000 calories");
    tasks.push("💧 Drink at least 2L water");
  }

  if (activity === "high") {
    tasks.push("🔥 Add 15 mins HIIT workout");
  } else if (activity === "low") {
    tasks.push("🚶 Take 10k steps today");
  }

  // Add a random extra task for variety
  tasks.push(extraTasks[Math.floor(Math.random() * extraTasks.length)]);

  tasks.forEach(task => {
    let li = document.createElement("li");
    li.textContent = task;
    challengeList.appendChild(li);
  });

  // Random motivational quote
  document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];

  // Animate challenge list
  challengeList.style.transition = "box-shadow 0.5s";
  challengeList.style.boxShadow = "0 0 12px 2px #43a04755";
  setTimeout(() => {
    challengeList.style.boxShadow = "";
  }, 800);
}

// Log progress
function logDay() {
  let water = parseFloat(document.getElementById("waterInput").value);
  let calories = parseInt(document.getElementById("calorieInput").value);
  let daySummary = document.getElementById("daySummary");

  // Input validation
  if (isNaN(water) || isNaN(calories)) {
    showTempMessage(daySummary, "⚠️ Please enter both water and calories.", 2000);
    return;
  }

  let summary = "✅ Progress logged! ";
  if (water >= 2) summary += "💧 Hydration goal met. ";
  else summary += "⚠️ Drink more water. ";

  if (calories < 1800) summary += "⚡ Low calorie intake today.";
  else if (calories > 2800) summary += "🍔 High calorie intake today.";
  else summary += "🍎 Balanced calorie intake.";

  daySummary.textContent = summary;

  // Save to localStorage
  localStorage.setItem("fitlife_lastSummary", summary);

  // Animate summary
  daySummary.style.transition = "box-shadow 0.5s";
  daySummary.style.boxShadow = "0 0 12px 2px #43a04755";
  setTimeout(() => {
    daySummary.style.boxShadow = "";
  }, 800);
}

// Show previous day's summary if available
window.addEventListener("DOMContentLoaded", () => {
  let last = localStorage.getItem("fitlife_lastSummary");
  if (last) {
    document.getElementById("daySummary").textContent = "Yesterday: " + last;
  }
});