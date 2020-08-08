class VanillaValidator {
    /**
     * Key: input to use in query selector
     * 
     * Value: rules to validate
     * @param {Object} rules 
     */
    setRules(rules) {
        rules = Object.values(rules).map(rule => {
            return rule.split('|').map(rule => {
                let position = rule.indexOf(':')
                let values = (() => {
                    return position !== -1 ? rule.substring((position) + 1) : ""
                })()
                let name = (() => {
                    return position !== -1 ? rule.substring(0, position).trim() : rule.trim()
                })()

                return { name, values }
            })
        })
        this.inputs = Object.keys(rules)
        this.rules = rules
    }

    validate() {
        if (typeof this.inputs == 'undefined') {
            console.error('Must define inputs using VanillaValidator.setRules')
        }
        if (typeof this.rules == 'undefined') {
            console.error('Must define rules using VanillaValidator.setRules')
        }
    }

    // min (input, min, message = null) {
    //     let input = document.querySelector(input)
    //     if (input.value.length < min) {
    //         return `${input.getAttribute('van-alias') ?? input.getAttribute('name')} deve ser maior que ${min}`
    //     }
    // }
}