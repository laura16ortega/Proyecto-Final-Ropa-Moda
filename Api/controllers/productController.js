const Product = require("./../models/productModels");

const cloudinary = require("../services/cloudinaryServices");
const Review = require("../models/ReviewModel")

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
      images,
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
      gender,
      summary
    } = req.body;
    if (!name || !price || !images || !marca || !category) {
      return res.status(500).json({ message: "Please Provide all Parameters" });
    }

    const result = await cloudinary.uploader.upload(images[0], {
      folder: "products",
    });
    console.log("CLOUDINARY RESULT", result)


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

      images: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      gender,
      summary

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


exports.addReveiw = async(req,res)=>{

  const {rating, comment, userId} = req.body;
  //if(!rating || !description)return res.status(500).json({message:"Please Provide all Parameters"});
  
  try {
  const product = await Product.findById(req.params.id);
  //if(!product) return res.stauts(400).json({message:"Product not found"});
    

  /*if(product){
      console.log(product)
      if(product.reveiws?.find((x)=>x.userId === req.userId)){
        return res.stauts(400).json({message:"Your Already Submitted a review"})
      }
    }*/

    const review = {
      rating,
      comment,
      userId,
      productId: req.params.id
    }
    //console.log(product.reviews.reduce((a,c)=>c.ratingsAverage + a,0)/product.reviews.length)
    const createdReview = await Review.create(review);
    product.reviews = [...product.reviews, createdReview._id]
    product.ratingsQuantity = product.reviews.length;
    await product.save();
    return res.send({message:"Review Created Succesfully"})
  } catch (error) {
    console.log(error)

    res.status(500).json({message:error})
  }*/
};

  }
}


exports.getReview = async(req,res)=>{
  //debo encontrar review por id de parametro
  //modificar data para devolver solo el rating, name, comment y la imagen
    try {
      const {id} = req.params;
      const reviews = await Review.findById(id).populate("userId")
      if(!reviews){
        return res.status(404).json({message:"Review Not Found"})
      }
      const review = {
        rating: reviews.rating,
        name: reviews.userId.fullName,
        comment: reviews.comment,
        picture:"",
        date: reviews.createdAt

      }
      res.status(200).json(review)
    } catch (error) {
      console.log(error)
      res.status(500).json({message:error})
    }
}


