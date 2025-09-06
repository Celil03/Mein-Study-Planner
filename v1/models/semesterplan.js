function Semesterplan(name, semester, studiengang) {
    this.id = Semesterplan.anzahlPlaene++;
    this.name = name;
    this.semester = semester;
    this.studiengang = studiengang;
    this.kurse = [];

    this.addKurse = function (kurseArray) {
        this.kurse.push(...kurseArray);
    };

    this.getAnzahlKurse = function () {
        return this.kurse.length;
    };

    this.getAnzahlStunden = function () {
        return this.kurse.reduce((sum, kurs) => sum + parseInt(kurs.termin.dauer), 0);
    };
}

Semesterplan.anzahlPlaene = 1;

module.exports = {
    Semesterplan
};