const getViewportWidth = () => window.innerWidth ||
    document.documentElement.clientWidth;

console.log("Die Viewport-Breite beträgt: ", getViewportWidth(), "Pixel");

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

    // function setLehrperson(Lehrperson){

    //     this.lehrperson = Lehrperson;
    // } TODO Frage ob das so geht oder ob man das im Konstruktor machen kann

    // function setTermin(Termin){
    //     this.termin = Termin;
    // }

}




function Studiengang(id, name) {

    this.id = id;
    this.name = name;
    this.kurse = [];

    function getKursByID(id) {

        if (this.kurse.find((id) => kurs.id === id)) {
            return kurs.id;
        }
        else return undefined
    }

    this.addKurse = function (kurs) {
        this.kurse.push(kurs);
    }


}

function Termin(beginn, dauer, wochentag, raum) {
    this.beginn = beginn;
    this.dauer = dauer;
    this.wochentag = wochentag;
    this.raum = raum;
}

function Lehrperson(id, nachname) {
    this.id = id;
    this.nachname = nachname;
}

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


let st1 = new Studiengang("WIPB", "Wirtschaftsinf. BPO 2018");
let st2 = new Studiengang("STDBSW", "Software- und Systemtechnik VR Softwaretechnik BPO 2015");
let st3 = new Studiengang("Mi", "Medizinische Informatik");

let sp1 = new Semesterplan("mein Plan22", "SS 23", st1.name); // Frage ob man die Zahl nicht nummerisch machen sollte
let sp2 = new Semesterplan("mein Plan23", "WS 24/25", st2.name);
let sp3 = new Semesterplan("mein Plan24", "SS 25", st3.name);

let lp1 = new Lehrperson("MP", "MusterProf");

let k1 = new Kurs(12345, "Web-Technologien", "V", st1, 4, "C3", lp1, new Termin("08:30", "90 minuten", "Mittwoch", "A.1.02"));
let k2 = new Kurs(23456, "Statistik", "Ü", st2, 3, "A1", lp1, new Termin("10:00", "90 minuten", "Montag", "A.E.01"));
let k3 = new Kurs(34567, "Logistikmanagement", "V", st1, 4, "C3", lp1, new Termin("10:00", "90 min", "Montag", "A.E.02"));


st1.addKurse(k1);
st1.addKurse(k3);
st1.addKurse(k2);

st2.addKurse(k1);
st2.addKurse(k3);
st2.addKurse(k2);

st3.addKurse(k1);
st3.addKurse(k3);
st3.addKurse(k2);

sp1.addKurse(st1.kurse);
sp2.addKurse(st2.kurse);
sp3.addKurse(st3.kurse);

const studiengaenge = [st1, st2, st3];
const semesterplaene = [sp1, sp2, sp3];


studiengaenge.forEach((studiengang) => {
    studiengang.kurse.sort((a, b) => a.modulID - b.modulID);
    console.log(`${studiengang.name} (${studiengang.id}):`);
    studiengang.kurse.forEach((kurs) => {
        console.log(`   ${kurs.modulID}: ${kurs.name}`);
    });
});

semesterplaene.forEach((semesterplan) => {
    semesterplan.kurse.sort((a, b) => a.modulID - b.modulID);
    console.log(`${semesterplan.name} (${semesterplan.semester}):`);
    semesterplan.kurse.forEach((kurs) => {
        console.log(`   ${kurs.modulID}: ${kurs.name}`);
    });
});
