
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const app = express();
const port = process.env.PORT || 3000
//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
	res.render('index', {
		title: 'weather',
		name: 'Zeniel Ebrahim'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Zeniel Ebrahim'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Zeniel Ebrahim',
		message: 'This is the help page.'
	});
});
app.get('/help/*', (req, res) => {
	//	res.send('Help article not found');
	res.render('404-page', {
		title: '404',
		message: 'Help article not found',
		name: 'Zeniel Ebrahim'
	});
});

app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({error: 'You must provide an address.'})
	}
	//////==================
	geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
		if (error) {
			return res.send({error});
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({error});
			}
			//-----------------------------------
			res.send({
				location,
				weather: `${forecastData.weather}. It is currently ${forecastData.temperature} degrees out. It feels like ${forecastData.feelslike} degrees.`,
				address:req.query.address
			});
			///-----------------
console.log(forecast)
			
		});
	/////=================================



}); })

app.get('/products', (req, res)=>{
	if(!req.query.search){
	return	res.send({error:'You must provide a search term'})
	}
	console.log(req.query)
	res.send({
		products:[]
	})
})

app.get('*', (req, res) => {
	//	res.send('my 404 page');
	res.render('404-page', {
		title: '404',
		name: 'Zeniel Ebrahim',
		message: 'Page not found'
	});
});

app.listen(port, () => {
	console.log('Server is up on port ' + port);
});
