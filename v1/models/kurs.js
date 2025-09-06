function isValiderTyp(typ) {
    const validTypes = ["V", "Ü", "P", "ÜPP", "SV", "T", "S", "Org"];

    return validTypes.includes(typ);

}

function Kurs(modulID, name, typ, studiengang, semester, gruppenbuchstabe, lehrperson, termin) {

    this.name = name;
    if (!isValiderTyp(typ)) {
        throw new Error("Ungültiger Kurstyp: " + typ);
    }
    this.modulID = modulID;
    this.typ = typ;
    this.gruppenbuchstabe = gruppenbuchstabe;
    this.studiengang = studiengang;
    this.semester = semester;
    this.lehrperson = lehrperson;
    this.termin = termin;
    this.id = `${this.modulID}-${this.termin.wochentag}-${this.termin.beginn}-${this.termin.raum}`;
}

module.exports = {
    isValiderTyp: isValiderTyp,
    Kurs
};