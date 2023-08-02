const mongooe = require('mongoose');

const productSchema = new mongooe.Schema({
    product_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    variants: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

const product = new mongooe.model('product', productSchema);

module.exports = product;
