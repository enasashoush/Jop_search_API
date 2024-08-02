import { Schema, Types, model } from "mongoose";

const companySchema = new Schema({

  companyName: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
    unique: [true, 'name is unique'],
    lowercase: true
  },
  companyEmail: {
    required: true,
    unique: true,
    type: String
  },
  description: String,
  industry: String,
  address: String,
  numberOfEmployees: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 11 && value <= 20;
      },
      message: 'Number of employees must be between 11 and 20.',
    }
  },
  companyHR: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

companySchema.virtual('Job', {
  ref: 'Job',
  localField: '_id',
  foreignField: 'companyId'
})


const companyModel = model('Company', companySchema)

export default companyModel