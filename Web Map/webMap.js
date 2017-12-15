var labels = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'label.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: labelStyleFunction
});

var locations = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'features.geojson',
    format: new ol.format.GeoJSON(),
  }),
  style: styleFunction
});

var icons = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'icon.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: iconStyleFunction
});

styles = {
  'Point': new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: 'white'
      }),
      radius: 3,
      stroke: new ol.style.Stroke({
        color: 'black',
        width: 2
      })
    })
  }),
  'LineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 2
    })

  }),
  'MultiLineString': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'black',
      width: 1
    })
  }),
  'MultiPoint': new ol.style.Style({
    image: new ol.style.Circle({
      fill: new ol.style.Fill({
        color: 'black'
      }),
      radius: 5,
      stroke: new ol.style.Stroke({
        color: '#ff0',
        width: 1
      })
    })
  }),
  'MultiPolygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'yellow',
      width: 1
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 0, 0.1)'
    })
  }),
  'Polygon': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }),
  'GeometryCollection': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'magenta',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'magenta'
    }),
    image: new ol.style.Circle({
      radius: 10,
      fill: null,
      stroke: new ol.style.Stroke({
        color: 'magenta'
      })
    })
  }),
  'Circle': new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'red',
      width: 2
    }),
    fill: new ol.style.Fill({
      color: 'rgba(255,0,0,0.2)'
    })
  })
};



function labelStyleFunction(feature, resolution) {
      if (feature.get('la_name') != 'None'){//may not be necessary
        return new ol.style.Style({
          text: new ol.style.Text({
            text: feature.get('la_name'),
            font:'16px Arial',
            fill: new ol.style.Fill({color: 'black'}),
            stroke: new ol.style.Stroke({color: 'white', width: 5}),
          })
        });
      }
    }

    
    function iconStyleFunction(feature, resolution) {
      return new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: feature.get('icon_path')
        }))
      });
    }

    

    function styleFunction(feature, resolution){
      console.log('here');
      if (feature.getGeometry().getType() == 'LineString'){
        console.log("line");
        var geometry = feature.getGeometry();
        var lineStyles = [
          // linestring
          new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'black',
              width: 1
            })
          })
          ];

          geometry.forEachSegment(function(start, end) {
            var dx = end[0] - start[0];
            var dy = end[1] - start[1];
            var len =Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2)); 
            var rotation = Math.atan2(dy, dx);
            var xAve = (start[0] + end[0])/2;
            var yAve = (start[1] + end[1])/2;
            mid = [xAve,yAve];
            
          // arrows
          if(len > 150000){ //only longer lines get arrows
            lineStyles.push(new ol.style.Style({
              geometry: new ol.geom.Point(mid),
              image: new ol.style.Icon({
                src: './res/arrow.png',
                anchor: [0.75, 0.5],
                rotateWithView: true,
                rotation: -rotation,
                scale: 0.65
              })
            }));
          };
        });
          return lineStyles;
        } else {
          return styles[feature.getGeometry().getType()];
        };
      };

      
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
       locations,
       labels,
       icons
       ],
       controls: ol.control.defaults({
        zoom: true,
        attribution: true,
        
      }),
       target:  document.getElementById('map'),
    	//Would like to change this to be automatic
    	view: new ol.View({
    		center: ol.proj.transform([28.32, 34.2], 'EPSG:4326', 'EPSG:3857'),
    		zoom: 6
    	})
    });


      /*Using https://openlayers.org/en/latest/examples/icon.html */
      var element = document.getElementById('popup');

      var popup = new ol.Overlay({
       element: element,
       autoPan: true,
       autoPanAnimation: {
        duration: 250
      },
      offset: [0, -10]
    });
      map.addOverlay(popup);

    // display popup on click
    map.on('click', function(evt) {
      var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
         return feature;
       });
      if (feature) {
       var coordinates = feature.getGeometry().getCoordinates();
       popup.setPosition(coordinates);
       $(element).popover({
         'placement': 'top',
         'html': true,
         'content': feature.get('passage')
       });
       $(element).popover('show');
     } else {
      $(element).popover('destroy');
    }
  });

      // change mouse cursor when over marker
      map.on('pointermove', function(e) {
        if (e.dragging) {
          $(element).popover('destroy');
          return;
        }
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
      });


      locations.getSource().on("change",function(evt) {
        extent = locations.getSource().getExtent();
        map.getView().fit(extent, {size: map.getSize(), padding:[30,0,30,0]});
      });