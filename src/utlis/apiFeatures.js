export class ApiFeatures {
    constructor(mongooseQuery, data) {
        this.mongooseQuery = mongooseQuery;
        this.data = data;
    }
    paginate() {
        let { page, size } = this.data;
        if (!page || page <= 0) {
            page = 1;
        }
        if (!size || size <= 0) {
            page = 5;
        }
        const skip = (page - 1) * size;
        this.mongooseQuery.limit(parseInt(size)).skip(parseInt(skip));
        return this;
    }
    filter() {
        let filter = { ...this.data };

        let excludeQueryParams = ['page', 'search', 'field', 'skip', 'size', 'sort'];
        excludeQueryParams.forEach((element) => {
            delete filter[element];
        });
        

        let stringFilters = {};
        for (const key in filter) {
            if (typeof filter[key] === 'string') {
                stringFilters[key] = filter[key];
                delete filter[key];
            }
        }

        filter = JSON.parse(JSON.stringify(filter).replace(/(gt|lt|gte|lte|eq|ne|nin|in)/g, (match) => `$${match}`));

        Object.assign(filter, stringFilters);

        this.mongooseQuery.find(filter);
        return this;
    }

    
    sort() {
        if (this.data.sort) {
            this.mongooseQuery.sort(this.data.sort.replaceAll(",", " "));
        }
        return this;
    }
    fields() {
        this.mongooseQuery.select(this.data.fields.replaceAll(",", " ,"));
        return this;
    }

    search() {
        const searchString = String(this.data.search);
        this.mongooseQuery.find({
            $or: [
                { workingTime: { $regex: searchString } },
                { jobLocation: { $regex: searchString } },
                { seniorityLevel: { $regex: searchString } },
                { jobTitle: { $regex: searchString } },
                { companyName: { $regex: searchString } },
                { jobDescription: { $regex: searchString } }
            ],
        });
        return this;
    }
}