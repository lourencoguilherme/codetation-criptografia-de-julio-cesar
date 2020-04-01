// Cria um novo objeto que herda o construtor de Error através do prototype.
// exports.HandleError = (status, name, error, message) => {
//     this.status = status || 500,
//     this.name = name || 'Internal Server Error', 
//     this.error = error || 'Internal Server Error' ,
//     this.message = message || 'Uninspected server error 500', 
//     this.stack = (new Error()).stack;
// }
// exports.HandleError = (name, error, message) => {
//     this.status = status || 500,
//     this.name = name || 'Internal Server Error', 
//     this.error = error || 'Internal Server Error' ,
//     this.message = message || 'Uninspected server error 500', 
//     this.stack = (new Error()).stack;
// }
// exports.HandleError = (error, message) => {
//     this.status = status || 500,
//     this.name = name || 'Internal Server Error', 
//     this.error = error || 'Internal Server Error' ,
//     this.message = message || 'Uninspected server error 500', 
//     this.stack = (new Error()).stack;
// }

// exports.HandleError = (message) => {
//     this.status = status || 500,
//     this.name = name || 'Internal Server Error', 
//     this.error = error || 'Internal Server Error' ,
//     this.message = message || 'Uninspected server error 500', 
//     this.stack = (new Error()).stack;
// }


class ApplicationError extends Error {
    constructor(status, name, error, message) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.status = status || 500;
        this.name = name || this.constructor.name;
        this.error = error || 'Internal Server Error';
        this.message = message || 
            'Something went wrong. Please try again.';        
        
    }
    
}

module.exports = ApplicationError;