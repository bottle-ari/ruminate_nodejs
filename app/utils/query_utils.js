

/**
 * convert req.query -> where clause
 * @param {object} queryString : req.query
 * @returns where clause / empty -> return {"",[]}
 */
function convertQueryStringToWhere(queryString) {
    const queryParams = queryString;
    const queryParts = [];
    const values = [];
  
    // Construct the SQL query dynamically
    // let query = 'SELECT * FROM accounts WHERE ';
    let where = '';

    if (!queryParams || Object.keys(queryParams).length == 0) {
        return {where,values};
    }
    
    where += ' where '
    for (const key in queryParams) {
      queryParts.push(`${key} = ?`);
      values.push(queryParams[key]);
    }
  
    where += queryParts.join(' AND ');

    return {where,values};
}

/**
 * request의 body를 이용하여 update sql로 변경
 * @param {string} tableName 
 * @param {*} req 
 * @returns 
 */
function convertPutReqToUpdateSql(tableName,req) {
    const {conditions,changes} = req.body
    if (!conditions || !changes) {
        throw Error("PUT Error => req need conditions and changes")
    }

    const setQueryParts = [];
    const whereQueryParts = [];
    const values = [];

    // ex) set age = 3 and name = 'abc'
    for (const key in changes) {
        setQueryParts.push(`${key} = ?`)
        values.push(changes[key])
    }
    let update_sql = "update "+tableName+" set ";
    update_sql += setQueryParts.join(' AND ')

    let where_sql =''
    if (Object.keys(changes).length > 0){
        where_sql += ' where '
        for (const key in conditions) {
            whereQueryParts.push(`${key} = ?`)
            values.push(conditions[key])
        }
        update_sql+=' where '
        update_sql+=whereQueryParts.join(' AND ')
    }
    return {update_sql,values};
}


module.exports = {convertQueryStringToWhere,convertPutReqToUpdateSql}