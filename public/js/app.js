const searchForm = document.querySelector('form')
const search = document.querySelector('input')
const price = document.querySelector('#price')
const change = document.querySelector('#change')

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const symbol = search.value;
	price.textContent = 'Loading...'
	change.textContent = ''

	fetch(`/stock?address=${symbol}`).then((res) => {
		res.json().then((data) => {
			if(data.error) {
				price.textContent = data.error
			}else{
				price.textContent = data.price
				change.textContent = data.change
			}
		})
	})

})