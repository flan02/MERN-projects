export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); //compara con lo qe el usuario envia.
    next();
  } catch (error) {
    //console.log(error.errors)
    //return res.status(400).json({ error }) devuelve rta larga
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) });
  }
};
