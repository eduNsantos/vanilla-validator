document.addEventListener('DOMContentLoaded', e => {
    const validator = new VanillaValidator()
    const rules = validator.setRules({
        'name':'required|min:2|max:5',
        'password': 'min:6'
    })

    console.log(rules)

})