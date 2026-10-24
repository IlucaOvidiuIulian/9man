// Asset layout configurations and color mapping indicators
const CLASS_CONFIG = {
  Paladin: { icon: "paladin.png", color: "#F58CBA", short: "PAL" },
  DeathKnight: { icon: "deathknight.png", color: "#C41F3B", short: "DK" },
  Mage: { icon: "mage.png", color: "#3FC7EB", short: "MAG" },
  Warrior: { icon: "warrior.png", color: "#C79C6E", short: "WAR" },
  Hunter: { icon: "hunter.png", color: "#ABD473", short: "HUN" },
  Rogue: { icon: "rogue.png", color: "#FFF569", short: "ROG" },
  Priest: { icon: "priest.png", color: "#FFFFFF", short: "PRI" },
  Warlock: { icon: "warlock.png", color: "#8787ED", short: "WLK" },
  Druid: { icon: "druid.png", color: "#FF7D0A", short: "DRU" },
  Shaman: { icon: "shaman.png", color: "#0070DE", short: "SHM" },
};

// Initialize application metrics and dynamic list selections
function init() {
  populateClassDropdown();
  calculateAggregates();
  renderTable();
}

// Identify unique classes available in config mapping variables to build selective option trees
function populateClassDropdown() {
  const select = document.getElementById("classFilter");

  Object.keys(CLASS_CONFIG)
    .sort()
    .forEach((className) => {
      const opt = document.createElement("option");
      opt.value = className;
      opt.textContent = className;
      select.appendChild(opt);
    });
}

// Static analysis counting engine mapping global structure arrays
function calculateAggregates() {
  const activePlayersCount = teamData.length;
  let activeCharactersCount = 0;

  teamData.forEach((p) => {
    activeCharactersCount += p.characters.length;
  });

  document.getElementById("playerCount").textContent = activePlayersCount;
  document.getElementById("charCount").textContent = activeCharactersCount;
}

// Trigger state changes re-rendering tables securely
function handleFilterChange() {
  renderTable();
}

// Main structural execution function constructing elements on target views
function renderTable() {
  const tbody = document.getElementById("tableBody");
  const selectedClass = document.getElementById("classFilter").value;
  tbody.innerHTML = "";

  let visibleRowsAdded = 0;

  teamData.forEach((playerGroup) => {
    // Filter down matching characters belonging to current loop iteration scope
    const matchingChars = playerGroup.characters.filter((char) => {
      return selectedClass === "ALL" || char.class === selectedClass;
    });

    // Structural layout rules determine whether to hide or present sectional player dividers
    const shouldShowPlayerHeader =
      selectedClass === "ALL" || matchingChars.length > 0;

    if (shouldShowPlayerHeader) {
      // Generate obvious parent row header block element partitions
      const headerRow = document.createElement("tr");
      headerRow.className = "player-header-row";

      const cell = document.createElement("td");
      cell.colSpan = 3;
      cell.textContent = playerGroup.player;

      headerRow.appendChild(cell);
      tbody.appendChild(headerRow);
      visibleRowsAdded++;

      // If active filter yields zero items for valid active headers, display note inside scope
      if (matchingChars.length === 0 && playerGroup.characters.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.className = "char-row";

        emptyRow.innerHTML = `
          <td colspan="3" style="text-align: center; color: var(--text-muted); font-size: 0.85rem; font-style: italic;">
            No characters registered for this player
          </td>
        `;

        tbody.appendChild(emptyRow);
        visibleRowsAdded++;
      }

      // Render individual items inside current structural parent grouping limits
      matchingChars.forEach((char) => {
        const row = document.createElement("tr");
        row.className = "char-row";

        // Column one: Class icon
        const c1 = document.createElement("td");
        const config = CLASS_CONFIG[char.class] || {
          color: "#333",
          short: "?",
          icon: null,
        };

        if (config.icon) {
          const icon = document.createElement("img");
          icon.className = "class-icon";
          icon.src = `icons/${config.icon}`;
          icon.alt = char.class;
          icon.title = char.class;
          icon.width = 24;
          icon.height = 24;

          // Fall back to the original colored class indicator if the image is missing
          icon.onerror = function () {
            const placeholder = document.createElement("div");
            placeholder.className = "class-icon-placeholder";
            placeholder.style.backgroundColor = config.color;
            placeholder.style.border = "1px solid rgba(255,255,255,0.15)";
            placeholder.title = char.class;
            placeholder.textContent = config.short;

            this.replaceWith(placeholder);
          };

          c1.appendChild(icon);
        } else {
          const placeholder = document.createElement("div");
          placeholder.className = "class-icon-placeholder";
          placeholder.style.backgroundColor = config.color;
          placeholder.style.border = "1px solid rgba(255,255,255,0.15)";
          placeholder.title = char.class;
          placeholder.textContent = config.short;

          c1.appendChild(placeholder);
        }

        // Column two: Dynamic target character hyperlink
        const c2 = document.createElement("td");
        const link = document.createElement("a");

        link.className = "char-link";
        link.href = `https://armory.warmane.com/character/${encodeURIComponent(
          char.name
        )}/Icecrown/summary`;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = char.name;

        c2.appendChild(link);

        // Column three: Stacked specialization lists
        const c3 = document.createElement("td");
        const specContainer = document.createElement("div");
        specContainer.className = "spec-container";

        char.specializations.forEach((spec) => {
          const item = document.createElement("div");
          item.className = "spec-item";

          item.innerHTML = `
            <span class="spec-rating">${spec.rating}</span>
            <span class="spec-name">${spec.name}</span>
          `;

          specContainer.appendChild(item);
        });

        c3.appendChild(specContainer);

        // Map all values back inside table arrays
        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);

        tbody.appendChild(row);
        visibleRowsAdded++;
      });
    }
  });

  // Global fallback when total results yield nothing under filter state requirements
  if (visibleRowsAdded === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="3" class="no-records">
          No entries match your class criteria.
        </td>
      </tr>
    `;
  }
}

// Trigger code instantiation on load
window.onload = init;
