module.exports = function (mongoose) {
  // Category Schema
  let categorySchema = new mongoose.Schema({
    category_id: { type: Number, require: true },
    name: { type: String, require: true },
  });

  mongoose.model('Category', categorySchema, 'categories');
};
