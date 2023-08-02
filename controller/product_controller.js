const route = require('../routes/route');
const Product = require('../models/prodct_schema');

module.exports.prodcutAdd = async function (req, res) {
    try {
        const { product_name, description, price, variants } = req.body;
        const new_product = new Product({
            product_name: product_name,
            description: description,
            price: price,
            variants: variants
        })
        const product = await new_product.save();
        return res.status(200).json(product)
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}



module.exports.check = async function (req, res) {
    try {
        const { product_name } = req.body;
        const product = await Product.findOne({ product_name: product_name });
        if (!product) {
            return res.status(404).json({ message: "Producr does not exist" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}

module.exports.prouct_update = async function (req, res) {
    try {
        const { product_name, description, price, variants, new_product_name, new_description, new_price, new_variants } = req.body;
        const product = await Product.findOne({ product_name: product_name });
        if (!product) {
            return res.status(404).json({ message: "Producr does not exist" });
        }
        const update = await Product.findByIdAndUpdate(product._id, {
            product_name: new_product_name,
            description: new_description,
            price: new_price,
            variants: new_variants
        })
        return res.status(200).json({
            message: "Updated Successfully",
            update
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}

module.exports.prouct_delete = async function (req, res) {
    try {
        const { product_name } = req.body;
        const product = await Product.findOne({ product_name: product_name });
        if (!product) {
            return res.status(404).json({ message: "Producr does not exist" });
        }
        const del = await Product.findByIdAndDelete(product._id, {
            id: product._id
        })
        return res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        console.log(error);
        return res.status(200).json(error);
    }
}