/* 運用時の変更箇所：各Microsoft Forms URLをここで差し替えてください。 */
const FORM_URLS = {
  participation: "https://example.com/participation-form",
  recruiter: "https://example.com/recruiter-form",
  referral: "https://example.com/referral-form"
};

/* 開催日時もここで一元管理しています。 */
const EVENT_DATE = new Date("2026-08-07T18:00:00+09:00");
const EVENT_END = new Date("2026-08-07T21:00:00+09:00");

document.querySelectorAll("[data-form]").forEach((button) => {
  button.addEventListener("click", () => {
    const url = FORM_URLS[button.dataset.form];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  });
});

function updateCountdown() {
  const element = document.querySelector("#countdown");
  const now = new Date();

  if (now >= EVENT_DATE && now <= EVENT_END) {
    element.textContent = "本日開催中！ 12F休憩室でお待ちしています";
    return;
  }
  if (now > EVENT_END) {
    element.textContent = "イベントは終了しました。ご参加ありがとうございました！";
    return;
  }

  const remaining = EVENT_DATE - now;
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  element.innerHTML = `<small>開催まで</small> あと <strong>${days}</strong>日 <strong>${hours}</strong>時間`;
}
updateCountdown();
setInterval(updateCountdown, 60 * 1000);

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    answer.hidden = isOpen;
  });
});

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#global-nav");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});
navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}));

if ("serviceWorker" in navigator && location.protocol !== "file:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./portal-service-worker.js").catch((error) => {
      console.warn("Service Worker registration failed:", error);
    });
  });
}

