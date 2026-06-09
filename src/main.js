const form = document.querySelector('.form');
const input = document.querySelector('.form__city-input')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    console.log('City: ', formData.get('city'))
    form.reset()
})