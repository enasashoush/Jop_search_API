import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;
const jobSchema = new Schema(
	{
		jobTitle: {
			type: String,
			required: [true, "name must be a required value"],
			trim: true,
			lowercase: true

		},
		jobLocation: {
			type: String,
			required: true,
			enum: ['onsite', 'remotely', 'hybrid']

		},
		workingTime: {
			type: String,
			required: true,
			enum: ['part-time', 'full-time']

		},
		seniorityLevel: {
			type: String,
			required: true,
			enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', ' CTO']

		},
		jobDescription: String,
		technicalSkills: {
			type: [String],
			required: true,
		},
		softSkills: {
			type: [String],
			required: true,
		},
		addedBy: [{
			type: Types.ObjectId,
			ref: 'User',
			required: true
		}],
		companyId: {
			type: Types.ObjectId,
			ref: 'Company'
		}
	},
	{
		timestamps: true,
	},
);



const jobModel = mongoose.model("Job", jobSchema);

export default jobModel;