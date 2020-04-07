const express= require( 'express');
const router = express.Router();

// importar el modelo auto
const Auto = require('../model/auto');

// Get con todos los documentos
router.get('/autos', async(req, res) => {
    try {
      const autoDB = await Auto.find();
      res.json(autoDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Get con parámetros
router.get('/auto/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const autoDB = await Auto.findOne({_id});
      res.json(autoDB);
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Agregar auto
router.post('/nuevo-auto', async(req, res) => {
  try {
    const autoDB = await Auto.create(req.body);
    res.status(200).json(autoDB); 
    console.log(autoDB)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Ocurrio un error',
      error
    })
  }
});

// Put actualizar auto
router.put('/auto/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
      const autoDB = await Auto.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(autoDB);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Delete eliminar auto
router.delete('/auto/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const autoDB = await Auto.findByIdAndDelete({_id});
      if(!autoDB){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        })
      }
      res.json(autoDB);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

// Exportamos la configuración de express app
module.exports = router;