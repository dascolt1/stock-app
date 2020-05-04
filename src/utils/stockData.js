const request = require('request')

const stockData = (ticker, cb) => {
	const API_KEY = 'E8W1AEKRB2CO3BBF'
	const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`

	request({url, json: true}, (err, res) => {
		if(err) {
			cb('error', undefined)
		}else if(res.body['Error Message']){
			cb('Invalid ticker', undefined)
		}else if(res.body.Note){
			cb('Too many API calls a minute', undefined)
		}else {
			cb(undefined, {
				price: res.body['Global Quote']['05. price'],
				change: res.body['Global Quote']['10. change percent']
			})
		}
	})
}

module.exports = stockData