(function () {
    'use strict';
    var sql = require('mssql');
 
    var config = {
        user: 'sa',
        password: '1234',
        server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
        database: 'TestElectron',
    
        options: {
            encrypt: false // Use this if you're on Windows Azure 
        },
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        }
    }    
   
    
     angular.module('app')
        .service('customerService', ['$q', CustomerService]);
    
    function CustomerService($q) {
        return {
            getCustomers: getCustomers,
            getById: getCustomerById,
            getByName: getCustomerByName,
            create: createCustomer,
            destroy: deleteCustomer,
            update: updateCustomer
        };
        
        function getCustomers() {
            var deferred = $q.defer();
            var query = "SELECT * FROM customers";
            
             sql.connect(config).then(function() {
             // Query        
            var request = new sql.Request();
            request.query(query).then(function(recordset) {               
                 deferred.resolve(recordset);
            }).catch(function(err) {
               deferred.reject(err);
            });    
        
            }).catch(function(err) {
               deferred.reject(err);
            });           
                      
            return deferred.promise;
        }
        
        function getCustomerById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM customers WHERE customer_id = ?";
            
            sql.connect(config).then(function() {
             // Query        
            var request = new sql.Request();
            request.query(query, [id]).then(function(recordset) {               
                 deferred.resolve(recordset);
            }).catch(function(err) {
               deferred.reject(err);
            });    
        
            }).catch(function(err) {
               deferred.reject(err);
            });           
                      
            return deferred.promise;
        }
        
        function getCustomerByName(name) {
            var deferred = $q.defer();
            var query = "SELECT * FROM customers WHERE name LIKE  '" + name + "%'";
            sql.connect(config).then(function() {
             // Query        
            var request = new sql.Request();
            request.query(query, [name]).then(function(recordset) {               
                 deferred.resolve(recordset);
            }).catch(function(err) {
               deferred.reject(err);
            });    
        
            }).catch(function(err) {
               deferred.reject(err);
            });           
                      
            return deferred.promise;
        }
        
        function createCustomer(customer) {
            var deferred = $q.defer();
            var query = "INSERT INTO customers SET ?";
            sql.connect(config).then(function() {
             // Query        
            var request = new sql.Request();
            request.query(query, customer).then(function(recordset) {               
                 deferred.resolve(recordset);
            }).catch(function(err) {
               deferred.reject(err);
            });    
        
            }).catch(function(err) {
               deferred.reject(err);
            });           
                      
            return deferred.promise;
        }
        
        function deleteCustomer(id) {
            var deferred = $q.defer();
            var query = "DELETE FROM customers WHERE customer_id = ?";
             sql.connect(config).then(function() {
             // Query        
            var request = new sql.Request();
            request.query(query, [id]).then(function(recordset) {               
                 deferred.resolve(recordset);
            }).catch(function(err) {
               deferred.reject(err);
            });    
        
            }).catch(function(err) {
               deferred.reject(err);
            });           
                      
            return deferred.promise;
        }
        
        function updateCustomer(customer) {
            var deferred = $q.defer();
            var query = "UPDATE customers SET name = ? WHERE customer_id = ?";
            
            sql.connect(config).then(function() {
             // Query        
            var request = new sql.Request();
            request.query(query,  [customer.name, customer.customer_id]).then(function(recordset) {               
                 deferred.resolve(recordset);
            }).catch(function(err) {
               deferred.reject(err);
            });    
        
            }).catch(function(err) {
               deferred.reject(err);
            });           
                      
            return deferred.promise;
        }
    }
    
})();