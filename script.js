const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const filters = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll("[data-tags]")];

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const selected = filter.dataset.filter;

    filters.forEach((item) => item.classList.toggle("is-active", item === filter));

    cards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      const isVisible = selected === "all" || tags.includes(selected);
      card.classList.toggle("is-hidden", !isVisible);
    });
  });
});
