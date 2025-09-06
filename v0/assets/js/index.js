// Gruppieren-Funktion
const gruppiereNach = (array, eigenschaft) =>
  array.reduce((ergebnis, element) => {
    const key = element[eigenschaft];
    if (!ergebnis[key]) {
      ergebnis[key] = [];
    }
    ergebnis[key].push(element);
    return ergebnis;
  }, {});

// Rendering-Funktion
function renderGruppiertePlaene(gruppiertePlaene) {
  const main = document.querySelector("main");
  const sections = main.querySelectorAll("section");
  sections.forEach(section => section.remove()); // Bestehende löschen

  for (let gruppe in gruppiertePlaene) {
    const section = document.createElement("section");
    const h3 = document.createElement("h3");
    h3.textContent = gruppe;
    section.appendChild(h3);

    const ul = document.createElement("ul");
    for (let plan of gruppiertePlaene[gruppe]) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "plan.html";
      const kursanzahl = plan.getAnzahlKurse();
      const stunden = plan.getAnzahlStunden();
      a.textContent = `${plan.name} (${kursanzahl} Kurse, ${stunden} Stunden)`;
      li.appendChild(a);
      ul.appendChild(li);
    }

    section.appendChild(ul);
    main.appendChild(section);
  }
}

// Event Listener für Dropdown
document.addEventListener("DOMContentLoaded", function () {
  const ausgewaehlt = document.getElementById("gruppierung");

  function aktualisiereAnsicht() {
    const wert = ausgewaehlt.value;
    const gruppiertePlaene = gruppiereNach(semesterplaene, wert);
    renderGruppiertePlaene(gruppiertePlaene);
  }

  ausgewaehlt.addEventListener("change", aktualisiereAnsicht);

  // Initiale Anzeige: Gruppieren nach Semester
  aktualisiereAnsicht();
});
