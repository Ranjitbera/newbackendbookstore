const mongoose = require("mongoose")

const bookdataSchema = new mongoose.Schema(
  {
    userid: {
      type: String
    },
    title: {
      type: String,
      required: true,
    },
    ISBN:{
      type:String,
      required: true
    },author:{
      type:String,
      required: true
    },
    pdate:{
      type:String
    },
    pname:{
      type:String,
      required:true
    },
    desc: {
      type: String,
      required: true,
    },

  },
  { timestamps: true }
);

const Bookdata = new mongoose.model("BOOKDATA",bookdataSchema);
module.exports = Bookdata
