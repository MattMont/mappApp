# Map Creator and web map template

The Map Creator web app be used to create maps using the AWMC background tiles. The maps can be made from scratch or geographic data from from various file formats can be added and modified. The layers from the maps created can be saved and used with the web map 
template so the maps can be used in a web page.

## Getting Started 


# Itinerary Maps

An embeddable map that uses Openlayers and javascript to plot the itineraries of heroes in Greek Myth.

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
 
 The AWMC Base map tiles are selected as follows:
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
          crossOrigin: 'anonymous',
          attributions: [
          new ol.Attribution({
            html: "Tiles &copy;" + "<a href='http://mapbox.com/'>MapBox</a>" +
            "Tiles and Data &copy 2017 <a href='http://www.awmc.unc.edu'>AWMC</a>" +
            " <a href='https://creativecommons.org/licenses/by/4.0/'>CC-BY-NC 4.0</a>"
          }),
          ],
        })
      }),
  ``` 
  
   The AMWC Coastal outline map is used by changing the urls as follows:
```javascript
      var map = new ol.Map({
       layers: [
       new ol.layer.Tile({
        source: new ol.source.XYZ({
          urls:
          [
          "http://a.tiles.mapbox.com/v3/isawnyu.eoupu8fr/{z}/{x}/{y}.png",
          "http://b.tiles.mapbox.com/v3/isawnyu.eoupu8fr/{z}/{x}/{y}.png",
          "http://c.tiles.mapbox.com/v3/isawnyu.eoupu8fr/{z}/{x}/{y}.png",
          "http://d.tiles.mapbox.com/v3/isawnyu.eoupu8fr/{z}/{x}/{y}.png"
          ],
          crossOrigin: 'anonymous',
          attributions: [
          new ol.Attribution({
            html: "Tiles &copy;" + "<a href='http://mapbox.com/'>MapBox</a>" +
            "Tiles and Data &copy 2017 <a href='http://www.awmc.unc.edu'>AWMC</a>" +
            " <a href='https://creativecommons.org/licenses/by/4.0/'>CC-BY-NC 4.0</a>"
          }),
          ],
        })
      }),
```
   The standard OSM tiles can be used as follows:
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
