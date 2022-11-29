const Product = require("./../models/productModels");

//ROUTE HANDLERS

exports.getAllProducts = async (req, res) => {
  //La función callback se llama Route Handler
  try {
    // const keyword = req.query.keyword
    //   ? { name: { $regex: req.query.keyword, $options: "i" } }
    //   : {};
    //BUILD QUERY
    //1)Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //2)Advanced filtering
    let queryStr = JSON.stringify(queryObj); //convertimos queryObj en un string para poder trabajarlo
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = Product.find(JSON.parse(queryStr)); //esto va a devolver una promesa, por eso usamos await y por eso podemos encadenar métodos

    //EXECUTE THE QUERY
    const products = await query; //le hacemos el await a la variable query para poder encadenar los métidos como sort, limit, page
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
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body, { runValidators: true });
    res.status(201).json({
      status: "success",
      data: { product: newProduct },
    });
  } catch (err) {
    res.status(400).json({ status: "fail,", message: err });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const tour = await Product.findByIdAndUpdate(req.params.id, req.body, {
      //el segundo parámetro es la información con la que queremos cambiar el tour
      new: true, //el tercer parámetro indica que queremos devolver el documento modíficado en vez del original
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { tour: tour } });
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const tour = await Product.findByIdAndDelete(req.params.id);
    res
      .status(204) //204 significa "no content"
      .json({ status: "success", data: null }); // ya no enviamos datos sino que enviamos null
  } catch (err) {
    res.status(404).json({ status: "fail", message: err });
  }
};
