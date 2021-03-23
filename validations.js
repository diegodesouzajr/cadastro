//validations.js
const Joi = require('joi');

const userSchema = Joi.object({
	var validade = data_validade()
	var fabricacao = moment();

	if (fabricacao > validade) {
   		return {
            		message: 'A data de validade deve ser inferior a data de fabricação.',
        	}
	} 
})

module.exports = {
    userSchema
}