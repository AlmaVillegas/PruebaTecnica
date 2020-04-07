const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutomovilSchema = new Schema({
  placas: {type: String, required: [true, 'obligatorio']},
  marca:{type: String, required: [true, 'obligatorio']},
  color:{type: String, required: [true, 'obligatorio']},
  modelo:{type: String, required: [true, 'obligatorio']},
  posicion:{type: String, required: [true, 'obligatorio']}
});

// Convertir a modelo
const Auto = mongoose.model('Auto', AutomovilSchema);
module.exports = Auto;
