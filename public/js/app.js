console.log('javascript');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const successMessage = document.querySelector('#success-message');
const errorMessage = document.querySelector('#error-message');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value

    successMessage.textContent = ''
    errorMessage.textContent = 'Loading...'

    fetch(`/api.weatherstack.com/current?access_key=08612709c5449d8b910b632a062077f1&query=${location}`)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log('error')
                    errorMessage.textContent = 'Unable to find location'
                } else {
                    console.log('success')
                    errorMessage.textContent = ''
                    successMessage.textContent = `In ${data.location.name} It's ${data.current.temperature}C° outside, but feels like ${data.current.feelslike}C°`
                }
            })
        })

})
