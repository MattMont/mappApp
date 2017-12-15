# Map Creator and web map template

The Map Creator web app be used to create maps using the AWMC background tiles. The maps can be made from scratch or geographic data
from from various file formats can be added and modified. The layers from the maps created can be saved and used with the web map 
template so the maps can be used in a web page.

## Getting Started

Select click on the large green "clone or download" button in the top right corner of the page. Select "download zip" and after it 
downloaded, unzip the file. The map Creator can be accessed by opening the "mapCreator.html" file. 

The layer files saved using the map creator must be saved in the same file as the web map template. Please note that the web map
cannot be viewed properly unless the template files are hosted on a web server.

## Map Creator
### Adding existing files
Files of the GPX, GeoJSON, IGC, KML,TopoJSON formats can be loaded to the base layer by dragging and dropping the file on the map. 
Select 'base layer' in the pop up when adding these files. Only icon and label layers made with the map creator should be added
using the other options.

### Features, Labels, and Icons
Features can be drawn be clicking 'Draw feature' and selecting a geometry type from the drop-down. Drawing a line is completed by
double clicking. Any of these features can be modified by clicking 'Select and Modify Feature' on the side bar. Click on the desired
feature and drag it to its new location. This also works with labels and icons, which act as 'Point' geometry.

The 'Pop-up text' in feature creation and editting refers to the pop-up that appears in the web map template when a feature is clicked. 

When exporting, the layers should be saved to the same directory as the web map template if it is being used.

### Limitations
When saving a .png file, the black and white background maps may not appear to be visible. This depends on the background colour
of the app being used to view the pictures

## Web Map template
### Using template
The template is created to work with the base, label, and icon layers exported by the Map creator, which will be saved in the same 
directory as webMap.js and webMap.css.

To use the the template, the .html page must inlcude all of the required script and link tags in the header.
```
<link rel="stylesheet" href="https://openlayers.org/en/v4.4.2/css/ol.css" type="text/css">
	    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>
	    <script src="https://openlayers.org/en/v4.4.2/build/ol.js"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js"></script>
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" type="text/css">
	    <script src="https://cdn.rawgit.com/walkermatt/ol3-layerswitcher/6e4cc8c9/src/ol3-layerswitcher.js"></script>
	    <link rel="stylesheet" href="https://cdn.rawgit.com/walkermatt/ol3-layerswitcher/6e4cc8c9/src/ol3-layerswitcher.css" type="text/css">
	    <link rel="stylesheet" type="text/css" href="webMap.css">
	    <script src="webMap.js"></script>
```
There will also need to be a div for the map placed in the page where it is wanted.
```
<div id="map" class="map"></div><div id="popup"></div>
```
 
 ### Changing map tile source
 To change the tiles that are used for the map background, the source option within the map variable must be changed to match the proper 
 url from the tile host server.
 
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

