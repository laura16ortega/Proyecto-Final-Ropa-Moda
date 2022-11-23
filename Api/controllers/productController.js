const Product = require("./../models/productModels");

//ROUTE HANDLERS

exports.getAllProducts = async (req, res) => {
  //La función callback se llama Route Handler
  try {
    //EXECUTE THE QUERY
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const products = await Product.find({ ...keyword }); //esto va a devolver una promesa, por eso usamos await

    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: products.length,
      data: { products },
    });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ status: "success", data: { product } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }

  //   if (id > tours.length) {
};
