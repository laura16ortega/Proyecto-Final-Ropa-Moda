const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET
});

const cloudinaryUploadImg = async(fileToUploads) => {
    try {
        return await cloudinary.uploader.upload(fileToUploads,{
            folder:"products"
        })
    } catch (error) {
        console.log(error)
    }
}

const cloudinaryDeleteImg = async(filePath)=>{
    return await cloudinary.uploader.destroy(filePath,{
        folder:"products"
    })
}
module.exports = {cloudinaryUploadImg, cloudinaryDeleteImg};