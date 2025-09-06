function Studiengang(id, name, kurse) {

    this.id = id;
    this.name = name;
    this.kurse = kurse || [];

     this.getKursByID = function (kursId) {
    return this.kurse.find((kurs) => kurs.id === kursId);
  };
}

module.exports = {
    Studiengang
};