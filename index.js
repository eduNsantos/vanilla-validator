document.addEventListener('DOMContentLoaded', e => {
    const validator = new VanillaValidator()
    const rules = validator.setRules({
        '[name="name"]':'required|min:2|max:5',
        '[name="password"]': 'min:6'
    })  

    validator.validate()

})