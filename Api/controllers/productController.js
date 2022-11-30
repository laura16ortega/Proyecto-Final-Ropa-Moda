const Product = require("./../models/productModels");
const cloudinary = require("../services/cloudinaryServices");

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
    res.status(203).json({
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
    const {
      name,
      price,
      description,
      category,
      image,
      stock,
      tallaCamiseta,
      tallaPantalon,
      marca,
    } = req.body;
    if (!name || !price || !image || !marca || !category) {
      return res.status(500).json({ message: "Please Provide all Parameters" });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    const newProduct = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      tallaCamiseta: tallaCamiseta ? tallaCamiseta : [],
      tallaPantalon: tallaPantalon ? tallaPantalon : [],
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
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

//REVIEW SECTION
exports.addReveiw = async (req, res) => {
  const { userId, rating, comment } = req.body;
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product || !userId || !rating || !comment) {
    return res.status(404).json({ message: "Please provide all parametrs" });
  }

  try {
    if (product.reviews.find((review) => review.userId === req.userId)) {
      return res
        .status(404)
        .json({ message: "You already submitted a review" });
    }
    const review = {
      userId,
      rating: Number(rating),
      comment,
    };
    product.reviews.push(review);
    product.ratingsQuantity = product.reviews.length;
    product.ratingsAverage =
      product.reviews.reduce((acc, c) => c.rating + acc, 0) /
      product.reviews.length;

    const updatedProduct = await product.save();

    res.status(201).json({
      message: "Review Created Succesfully",
      review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      ratingsQuantity: product.ratingsQuantity,
      rating: product.ratingsAverage,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }

  /*const {rating, description, userId} = req.body;
  if(!rating || !description)return res.status(500).json({message:"Please Provide all Parameters"});
  
  const product = await Product.findById(req.params.id);
  if(!product) return res.stauts(400).json({message:"Product not found"});
    
  /*if(product){
      console.log(product)
      if(product.reveiws.find((x)=>x.userId === req.userId)){
        return res.stauts(400).json({message:"Your Already Submitted a review"})
      }
    }

    const review = {
      rating,
      description,
      userId,
      productId: req.params.id
    }
    //console.log(product.reviews.reduce((a,c)=>c.ratingsAverage + a,0)/product.reviews.length)
  try {
    const createdReview = await Review.create(review);
    product.reviews.push(createdReview._id);
    product.ratingsQuantity = product.reviews.length;
    const updatedProduct = await product.save();

    //Calcular promedio de rating del producto y de las reveiw y devolverlas
    res.status(201).json({
      message:"Review created successfully",
      updatedProduct
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({message:error})
  }*/
};
