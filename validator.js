class VanillaValidator {
    constructor() {
        this.fields = []
        this.messages = []
        this.errors = []

        // this.validate().bind(this.errors)
    }

    /**
     * Key: input to use in query selector
     * 
     * Value: rules to validate
     * @param {Object} rules Regra para validação, usando um object {'input': 'regras|separados_por_pipe}
     */
    setFields(validationOptions) {
        let validator
        let rules
        let rule
        let ruleName
        let options = []

        for (let validationField in validationOptions) {
            validator = {}
            validator.validationField = validationField.trim()
            validator.rules = {}
    
            rules = validationOptions[validationField].split('|')
            rules = rules.map(rule => rule.trim())

            for (let ruleIndex in rules) {
                rule = rules[ruleIndex]
                options = []

                if (rule.indexOf(':') !== -1) {
                    ruleName = rule.substring(0, rule.indexOf(':'))
                    options.push(rule.substring(rule.indexOf(':') + 1).split(','))
                } else {
                    ruleName = rule
                }

                validator.rules[ruleName] = {
                    options: options
                }
            }

            this.fields.push(validator)
        }
    }

    /**
     * 
     * @param {Object} messages Mensagens da validações, usando um object {'input.regra': 'mensagem'}
     */
    setMessages(messages) {
        this.messages = messages
    }

    getMessage(input, rule, option = null) {

    }

    rules(field, ruleName, args) {
        const validationField = document.querySelector(field)
        const rules = {
            required() {
                if (validationField.value == "") {
                    return `O campo ${field} não pode ser vazio`
                }
            },
            min() {
                if (validationField.value.length < args.options[0]) {
                    return `O campo ${field} deve ser maior que ${args.options[0]}`
                }
            },
            max() {
                if (validationField.value.length > args.options[0]) {
                    return `O campo ${field} deve ser menor que ${args.options[0]}`
                }
            },
        }
        
        if (validationField == null) {
            return console.error(`The field '${field} does not exist in your form'`)
        }

        return rules[ruleName]()
    }

    validate() {
        let message

        if (this.allRequiredParametersAreDefined()) {
            this.errors = []
            for (let field of this.fields) {
                for (let rule in field.rules) {
                    message = this.rules(field.validationField, rule, field.rules[rule])
                    
                    if (typeof message != 'undefined') {
                        this.errors.push(message)
                    }
                }
            }
        }

        console.log(this.errors)
    }

    allRequiredParametersAreDefined() {
        if (typeof this.fields == 'undefined') {
            console.error('Must define fields using VanillaValidator.setFields')

            return false
        }
        if (typeof this.messages == 'undefined') {
            console.error('Must define messages using VanillaValidator.setMessages')

            return false
        }

        return true
    }
}