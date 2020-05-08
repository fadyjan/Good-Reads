const {Schema:mongooseSchema , model ,Schema} = require("mongoose")

let bookSchema = new mongooseSchema({
   bookName:{type:String,required:true},
   catId:{type:Schema.Types.ObjectId, ref:'category'},
   authorId:{type:Schema.Types.ObjectId, ref:'author'},
   coverImageName:{type:String,required:true}
});

bookSchema.statics.getAllBooks = function () {
   return this.find({})
};

bookSchema.statics.findByBookId = function (id) {
   return this.model.findById(id)
};


let BookModel = model('book',bookSchema);

module.exports = BookModel;