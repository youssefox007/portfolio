const data = window.portfolioData;

const iconMap = {
  apple: '<span class="store-icon store-icon-apple" aria-hidden="true">&#63743;</span>',
  play: '<span class="store-icon store-icon-play" aria-hidden="true">&#9654;</span>',
  web: '<i data-lucide="external-link" aria-hidden="true"></i>'
};

function $(selector) {
  return document.querySelector(selector);
}

function logoMarkup(item) {
  if (item.image) {
    return `<img src="${item.image}" alt="${item.title} logo" />`;
  }

  return `<span>${item.initials}</span>`;
}

function linkMarkup(link) {
  const isDisabled = !link.url;
  const label = link.status || link.label;

  return `
    <a
      class="store-pill ${isDisabled ? "is-disabled" : ""}"
      href="${link.url || "#"}"
      ${isDisabled ? 'aria-disabled="true"' : 'target="_blank" rel="noreferrer"'}
    >
      ${iconMap[link.kind] || '<i data-lucide="arrow-up-right" aria-hidden="true"></i>'}
      ${label}
    </a>
  `;
}

function productCard(item, type) {
  const links = item.links || [
    {
      label: "Visit",
      kind: "web",
      status: item.status
    }
  ];

  return `
    <article class="product-card ${type}-card" style="--item-accent: ${item.accent}">
      <div class="product-main">
        <div class="logo-tile">${logoMarkup(item)}</div>
        <div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      </div>
      <div class="product-actions">
        ${links.map(linkMarkup).join("")}
      </div>
    </article>
  `;
}

function stackItem(item, index) {
  return `
    <article class="stack-item ${index === data.stack.length - 1 ? "is-highlighted" : ""}" style="--stack-color: ${item.color}">
      <span class="stack-icon">
        <img src="${item.logo}" alt="" onload="this.nextElementSibling.hidden=true" onerror="this.hidden=true" />
        <b>${item.short}</b>
      </span>
      <strong>${item.name}</strong>
    </article>
  `;
}

$("#brand-name").textContent = data.profile.name;
$("#brand-role").textContent = data.profile.role;
$("#hero-copy").textContent = data.profile.hero;
$("#apps-copy").textContent = data.profile.appIntro;
$("#apps-count").textContent = `${data.apps.length} apps`;
$("#contact-line").textContent = `${data.profile.phone} - Usually replies within a few hours`;

document.querySelectorAll(".whatsapp-link, #header-whatsapp").forEach((link) => {
  link.href = data.profile.whatsappUrl;
  link.target = "_blank";
  link.rel = "noreferrer";
});

$("#app-grid").innerHTML = data.apps.map((item) => productCard(item, "app")).join("");
$("#stack-grid").innerHTML = data.stack.map(stackItem).join("");
$("#footer-year").textContent = new Date().getFullYear();

if (window.lucide) {
  window.lucide.createIcons();
}
