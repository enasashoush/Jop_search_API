import mongoose, { Types } from "mongoose";

const { Schema } = mongoose;

const applicationSchema = new Schema(
	{
		userResume: {
			type: Object,
			required: [true, "must be pdf"],
		},
		userId: {
			type: Types.ObjectId,
			required: [true, 'name is required'], 
			ref: 'User'
		},
		jobId: {
			type: Types.ObjectId,
			required: [true, 'name is required'],
			ref: 'Job'
		},
		userTechSkills: {
			type: [String],
			required: true,
		},
		userSoftSkills: {
			type: [String],
			required: true,
		}
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	},
);
applicationSchema.virtual('User', {
	ref: 'User',
	localField: 'userId',
	foreignField: '_id'
  })
const applicationModel = mongoose.model("Application", applicationSchema);

export default applicationModel;