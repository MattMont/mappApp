# Itinerary Maps

An embeddable map that uses Openlayers and javascript to plot the itineraries of heroes in Greek Myth.

## Getting Started 

The .html and .geojson files should be hosted in the same directory of a web server. If a web server is not used, web browser security measures 
will prevent the .geojson file from being opened due to being form a different domain.

### Adding Geojson file
To change the Geojson file being pulled from, the url option of the locations variable must be changed to match the file name.
```javascript
var locations = new ol.layer.Vector({
      	source: new ol.source.Vector({
        	url: 'kmlconv.geojson',
        	format: new ol.format.GeoJSON(),
   		}),
 ```
 
 ### Changing map tile source
 To change the tiles that are used for the map background, the source option within the map variable must be changed to match the proper url
 from the tile host server.
 
 The AWMC ancient map tiles are selected as follows:
```javascript
 var map = new ol.Map({
    	layers: [
    		new ol.layer.Tile({
        		 source: new ol.source.XYZ({
              urls:
              [
                "http://a.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png",
                "http://b.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png",
                "http://c.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png",
                "http://d.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png"
              ],
              crossOrigin: 'anonymous'
            })
  ```          
   While the standard OSM tiles can be used as follows:
```javascript
   var map = new ol.Map({
    	layers: [
    		new ol.layer.Tile({
        		 source: new ol.source.OSM()
        })
```
   Examples of map tiles availabe can be found at the following sites:
   http://wiki.openstreetmap.org/wiki/Tile_servers
   https://leaflet-extras.github.io/leaflet-providers/preview/
   
   Please not that some of these tiles require payment before they can be used.
