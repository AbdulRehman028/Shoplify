class ApiFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filters() {
    const queryCopy = { ...this.queryStr };

    // Remove specific fields
    const fieldsToRemove = ["keyword", "page", "limit"];
    fieldsToRemove.forEach((key) => delete queryCopy[key]);

    let finalQuery = {};
    for (let key in queryCopy) {
      if (key.includes("[")) {
        // Logic for 'price[gte]'
        const [mainKey, operator] = key.split(/[\[\]]+/);
        const mongoOperator = `$${operator}`;

        if (!finalQuery[mainKey]) finalQuery[mainKey] = {};

        const val = Number(queryCopy[key]);
        finalQuery[mainKey][mongoOperator] = isNaN(val) ? queryCopy[key] : val;
      } else {
        // Logic for standard fields like category
        finalQuery[key] = queryCopy[key];
      }
    }

    // console.log("FINAL MONGO QUERY:", finalQuery);

    this.query = this.query.find(finalQuery);
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.skip(skip).limit(resultPerPage);
    return this;
  } 
}

export default ApiFilters;
