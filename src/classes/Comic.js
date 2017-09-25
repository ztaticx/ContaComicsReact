import moment from "moment";

export function code(rr) {
  let str = (rr.title + rr.volumen + rr.variant).toString();
  return str.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

export function ComicFields() {
  return [
    new ComicField("Title", "text"),
    new ComicField("Volumen", "number"),
    new ComicField("Variant", "text", false),
    new ComicField("Price", "number"),
    new ComicField("Date", "date"),
    new ComicField("Owned", "checkbox", false)
  ];
}

export class ComicField {
  title = "";
  id = "";
  type = "";
  volumen = "";
  required = true;
  constructor(title, type, required) {
    this.title = title;
    this.id = this.title.toLowerCase();
    this.type = type;

    if (typeof required !== "undefined" && required !== true) {
      this.required = false;
    }
  }
}

export class Comic {
  constructor(o) {
    if (o) {
      this.title = o.title;
      this.volumen = o.volumen;
      this.variant = o.variant;
      this.price = o.price;
      this.date = o.date;
      this.owned = o.owned;
    }
  }

  get id() {
    return code(this);
  }

  _title;
  get title() {
    return this._title;
  }
  set title(d) {
    if (d) this._title = d.toString();
  }

  _volumen;
  get volumen() {
    return this._volumen;
  }
  set volumen(d) {
    if (d && !isNaN(d)) {
      this._volumen = parseInt(d, 10);
    }
  }

  _variant;
  get variant() {
    return this._variant;
  }
  set variant(d) {
    if (d) this._variant = d.toString();
  }

  _price;
  get price() {
    return this._price;
  }
  set price(d) {
    if (d && !isNaN(d)) {
      this._price = parseFloat(d).toFixed(2);
    }
  }

  _date = moment();
  get date() {
    return moment(this._date);
  }
  set date(d) {
    let date = moment(d);
    if (date) {
      this._date = date;
    }
  }
  get dateStr() {
    return this._date.format().toString();
  }

  _owned = false;
  get owned() {
    return this._owned;
  }
  set owned(d) {
    this._owned = d && (d === true || d === 1);
    this._ownedDate = this._owned ? moment() : undefined;
  }
  get ownedStr() {
    return this._owned ? "Yes" : "No";
  }

  _ownedDate;
  get ownedDate() {
    return this._ownedDate ? moment(this._ownedDate) : undefined;
  }

  toggleOwned() {
    this.owned = !this.owned;
  }

  get storable() {
    return {
      id: this.id,
      title: this.title,
      volumen: this.volumen,
      variant: this.variant,
      price: this.price,
      date: this.date,
      owned: this.owned
    };
  }
}