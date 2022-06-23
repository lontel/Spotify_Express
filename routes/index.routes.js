const router = require("express").Router();
const hbs = require("hbs");

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});


spotifyApi
  .clientCredentialsGrant()
  .then(data => spotifyApi.setAccessToken(data.body['access_token']))
  .catch(error => console.log('Something went wrong when retrieving an access token', error));

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/resultados", (req, res) => {

  const { artist } = req.query

  spotifyApi
    .searchArtists(artist)
    .then(data => {
      res.render('artist-search', { data })
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
});

router.get("/albums/details/:album_id", (req, res) => {
  const { album_id } = req.params

  spotifyApi.getArtistAlbums(album_id)
    .then(data => {
      console.log('Artist albums----------------------------------', data.body.items);
      res.render('albums/details', { data })
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));

})



module.exports = router;
