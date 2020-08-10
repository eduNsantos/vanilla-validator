
const validator = new VanillaValidator()
const form = document.getElementById('form')

validator.setFields({
    '[name="name"]':'required|min:5',
    '[name="password"]': 'min:6'
})
validator.setMessages({
    '[name="name"].required': 'O campo nome é obrigatório'
})


document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();

    validator.validate()
})
// document.addEventListener('DOMContentLoaded', e => {
//     // validator.validate()

// })