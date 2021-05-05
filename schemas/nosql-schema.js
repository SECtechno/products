import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [{ feature: String, value: String }],
  related: [{ _id: integer }],
  styles: [{
    name: String,
    original_price: Number,
    sale_price: Number,
    'default?': Boolean,
    skus: [{
      sku_no: Number,
      quantity: Number,
      size: Number,
    }],
    photos: [{ thumbnail_url: String, url: String }]
  }],
});