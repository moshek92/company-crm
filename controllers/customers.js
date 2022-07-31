const joi = require('joi');
const database = require('./database');
const fileMgmt = require('../shared/fileMgmt');

module.exports = {
    addCustomer: async function (req, res, next) {
        const reqBody = req.body;

        const schema = joi.object({
            first_name: joi.string().required().min(2).max(200),
           last__name: joi.string().required().min(2).max(200),
            email: joi.string().required().regex(/^[^@]+@[^@]+$/),
            phone: joi.string().required().regex(/^[0-9]{8,11}$/),
            
        });

        const { error, value } = schema.validate(reqBody);

        if (error) {
            res.send(`error adding customer: ${error}`);
            return;
        }

        const sql =
            "INSERT INTO customers(first_name, last_name, phone, email)" +
            " VALUES(?,?,?);";

        try {
            const result = await database.query(
                sql,
                [value.first_name,value.last_name,  value.phone, value.email]
            );

            value.id = result[0].insertId;
            res.json(value);
        }
        catch (err) {
            console.log(err);
            return;
        }


    },

    customersList: async function (req, res, next) {
        const param = req.query;

        const schema = joi.object({
            column: joi.string().valid('first_name', 'last_name', 'email').default('name'),
            sort: joi.string().valid('ASC', 'DESC').default('ASC'),
        });

        const { error, value } = schema.validate(param);

        if (error) {
            console.log(error);
            res.status(400).send('add failed');
            return
        }

        const fieldsMap = new Map([
            ['first_name', 'customers.name'],
            ['last_name', 'customers.name'],
            ['email', 'customers.email'],
           
        ]);

        const sql = SELECT * FROM `customers`;

       /*  const sql = `SELECT customers.id, customers.first_name,customers.last_name, customers.phone, customers.email,  
            countries.id AS country_id, countries.name AS country_name, countries.country_code  
            FROM customers LEFT JOIN countries ON customers.country_id = countries.id 
            ORDER BY ${fieldsMap.get(value.column)} ${value.sort};`; */

        try {
            const result = await database.query(sql);
            res.json(result[0]);
        }
        catch (err) {
            console.log(err);
            res.json(err);
        }
    },

    exportCustomers: function (req, res, next) {
        const sql = "SELECT cust.first_name,cust.last_name,  cust.phone, cust.email, ";

        fileMgmt.exportToFile(res, sql, 'customers');
    },

    findCustomer: async function (req, res, next) {
        const param = req.query;

        const schema = joi.object({
            search: joi.string().required().min(2)
        });

        const { error, value } = schema.validate(param);

        if (error) {
            res.status(400).send(`search error: ${error}`);
            throw error;
        }

        const searchQuery = `%${value.search}%`;

        const sql = `SELECT customers.id, customers.first_name,customers.last_name, customers.phone, customers.email,   
            WHERE customers.first_name LIKE ? OR customers.last_name LIKE ? OR customers.email LIKE ?  
            ORDER BY customers.name ASC;`;

        try {
            const result = await database.query(
                sql,
                [
                    searchQuery,
                    searchQuery,
                    searchQuery,
                    searchQuery,
                ]
            );

            res.json(result[0]);
        } catch (err) {
            res.status(400).send(`search error: ${err}`);
            throw error;
        }
    },

    // todo: edit/update customer
    updateCustomer: async function (req, res, next) { },

    // todo: view more details of a customer
    // viewCustomerDetails: async function (req, res, next) { },
}
