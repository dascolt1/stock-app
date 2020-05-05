const express = require('express')
const path = require('path')
const hbs = require('hbs')
const stockData = require('./utils/stockData')
const request = require('request')

const app = express();

app.use(express.static(path.join(__dirname, '../public')))

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000


//hbs engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
	res.render('index', {
		title: 'Stock Data'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		msg: "Learn about stock data here!"
	})
})

app.get('/stock', (req, res) => {
	if(!req.query.address){
		return res.send({
			error: 'You must provide a stock symbol'
		})
	}

	stockData(req.query.address, (err, data) => {
		if(err) {
			return res.send({error: err})
		}else {
			return res.send({
				price: `The current price is ${data.price}`,
				change: `The stock changed ${data.change}`
			})
		}
	})
})

app.get('*', (req, res) => {
	res.render('404', ({
		title: 404,
		message: "404 not found",
		name: "Tommy D'Ascoli"
	}))
})

app.listen(port, () => {
	console.log('listening on port '+port)
})