class VanillaValidator {
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

        return rules
    }

    validate() {
        
    }

    min (input, min, message = null) {
        if (document.querySelector(input).value.length < min) {
            return `${input.getAttribute('van-alias') ?? input.getAttribute('name')} deve ser maior que ${min}`
        }
    }
}