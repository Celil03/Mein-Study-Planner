const http = require("http");
const persistence = require("../models/persistence");


    persistence.initialisiereLehrangebot();


  const server = http.createServer((req, res) => {
    const html = generiereHTML(); // Jetzt sind Daten sicher geladen

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });

  server.listen(8844, () => {
    console.log("Ich lausche nun auf http://localhost:8844");
  });


function generiereHTML() {
  const studiengaenge = persistence.holeAlleStudiengaenge();

  let html = `
    <!DOCTYPE html>
    <html lang="de">
    <head>
      <meta charset="UTF-8" />
      <title>Study Planner Test</title>
    </head>
    <body>
      <h1>Study Planner Test</h1>
  `;

  studiengaenge.forEach((sg) => {
    html += `
      <h2>${sg.name} (${sg.id})</h2>
      <p>${sg.kurse.length} Kurse enthalten:</p>
      <ul>
    `;

    sg.kurse.forEach((kurs) => {
      html += `<li>
        ${kurs.id} ${kurs.name} [StgPO: ${kurs.courseOfStudy}] 
        (${kurs.courseType}, ${kurs.lehrperson.nachname})
      </li>`;
    });

    html += `</ul>`;
  });

  html += `
    </body>
    </html>
  `;

  return html;
}
