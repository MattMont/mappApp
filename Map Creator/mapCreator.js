  
  /*
   * Style function section. Contains the style function for the 
   * base, label, and icon vector layers.
   */


  /*
   * Defualt styles used for the layers. 
   */

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

 /*
  *Checks feature to see if it has property. Returns boolean.
  */

  function hasProperty(feature,prop){
    var list = feature.getKeys();
    if (list.includes(prop)){
      return true;
    } else {
      return false;
    }
  };

  /*
   * Style function for base layer. Uses the default style structure,
   * excpet in the case of LineString geometries. Then it creates an
   * line with an arrow.
   */
  var styleFunction = function(feature, resolution){
    if (feature.getGeometry().getType() == 'LineString'){
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

  /*
   * Style function for labels. Labels are made using the point
   * geomtery. Every other geometry type uses default style.
   */
    function labelStyleFunction(feature, resolution) {
      if (hasProperty(feature,'la_name')){
        return new ol.style.Style({
          text: new ol.style.Text({
            text: feature.get('la_name'),
            font:'16px Arial',
            fill: new ol.style.Fill({color: 'black'}),
            stroke: new ol.style.Stroke({color: 'white', width: 5}),
          })
        });
      } else {
        return styles[feature.getGeometry().getType()];
      };
    };

  /*
   * Style function for icons. Icons are made using the point
   * geomtery. Every other geometry type uses default style.
   */
  function iconStyleFunction(feature, resolution) {
    if (hasProperty(feature,'icon_path')){
      return new ol.style.Style({
        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
          src: feature.get('icon_path')
        }))
      });
    } else {
      return styles[feature.getGeometry().getType()];
    };
  };



  /*   
   * Vector source and vector layer creation section.
   */
  var labelSource = new ol.source.Vector({
  }); 

  var labelVector = new ol.layer.Vector({ 
    source: labelSource,    
    style: labelStyleFunction
  });

  var iconSource = new ol.source.Vector({
  }); 

  var iconVector = new ol.layer.Vector({ 
    source: iconSource,    
    style: iconStyleFunction
  });

  var source = new ol.source.Vector({
  }); 

  var vector = new ol.layer.Vector({ 
    source: source,    
    style: styleFunction
  });
    



  /*
   * Map creation section. Map object created here
   */

  // Coordinates the map opens to.
  var initCoord = new ol.proj.fromLonLat([20, 34]);
  var extent = [0, 0, 1024, 968];
  var projection = new ol.proj.Projection({
    units: 'pixels',
    extent: extent
  });

  var map = new ol.Map({
    layers: [
    new ol.layer.Group({
      'title': 'Base maps',
      layers: [
      new ol.layer.Group({
        title: 'Black and White',
        type: 'base',
        combine: true,
        visible: false,
        layers: [
        new ol.layer.Image({ //does not work as intended. Can be removed later.
          source: new ol.source.ImageStatic({
            url: './res/whitebackground.png',
            projection: projection,
            imageExtent: extent
          })
        }),
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
        ]
      }),
      new ol.layer.Tile({
        title: 'Colour',
        type: 'base',
        visible: true,
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
      })
      ]
    }),
    vector, iconVector, labelVector],
    target: 'map',
    view: new ol.View({
      projection: 'EPSG:3857',
      center: initCoord,
      zoom: 4
    })
  });


  /*
   * Layer switcher control.
   * From https://github.com/walkermatt/ol3-layerswitcher
   */
  var layerSwitcher = new ol.control.LayerSwitcher({
  });
  map.addControl(layerSwitcher);

  // idea from opoenLayers 3.x Cookbook by Peter J. Langley, Antonio Santiago Perez
  var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(2),
    projection: 'EPSG:4326'
  });

  map.addControl(mousePositionControl)

      
  /*
   * Drawing and other interaction section.
   */

  var draw, snap, labelDraw; 
  var featureTypeselect = document.getElementById('type');
  
  var select_interaction = null;
  var modify = null;
  var select = null;
  var featureID = 0;
  var selectedFeatureID;
  var selectedLayer = vector;

  //Adds the interaction that allows feature selection and modification
  function addSelectMod(){
    resetType();
    select_interaction = new ol.interaction.Select({
      wrapX: false,
      hitTolerance:5
    });
    map.addInteraction(select_interaction);

    select_interaction.getFeatures().on('add', function (event) {
      var properties = event.element.getProperties();
      selectedFeatureID = properties.id;
    });


    modify = new ol.interaction.Modify({
      features: select_interaction.getFeatures()
    });

    map.addInteraction(modify);
  }

  //Adds the drawing interactions that the user selects
  function addFeatureInteractions() {
    var value = featureTypeselect.value;
    if (value !== 'None'){ //will have to add seperate ifs for types
      draw = new ol.interaction.Draw({
        source: source,
        type: /** @type {ol.geom.GeometryType} */ (featureTypeselect.value)
      });

      draw.on('drawend', function (event) {
        featureID = featureID + 1;
        event.feature.setProperties({
          'id': featureID,
          'passage': ''
        })
      })
      map.addInteraction(draw);
    } else {
      addSelectMod();
    }
    snap = new ol.interaction.Snap({source: source}); //snap interaction
    map.addInteraction(snap);
  }

  /**
   * Handle change event for the input drop-down for drawing features.
   */
   featureTypeselect.onchange = function() {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    map.removeInteraction(select_interaction);
    select_interaction = null;
    map.removeInteraction(modify);
    modify = null;
    addFeatureInteractions();
  };
  /*End of Draw*/
  addFeatureInteractions();

  // put these together. Only slightly different than above.
  function removeInteractions(){
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    map.removeInteraction(select_interaction);
    select_interaction = null;
    map.removeInteraction(modify);
    modify = null;
  }

  // resets the drop-down input for drawing interaction
  function resetType() {
    $("#type").each(function() { this.selectedIndex = 0 });
    removeInteractions();
  }

  //Finds which layer the feature the user clicked on is located
  map.on('click', function(evt) {
    map.forEachLayerAtPixel(evt.pixel, function(layer){ 
      if(layer===labelVector) {
        selectedLayer = labelVector;
      } 
      if(layer===vector){
        selectedLayer = vector;
      }
      if(layer===iconVector){
        selectedLayer = iconVector;
      }
    });
  });   


  /*
   * Drag and Drop interaction section.
   */

  //gets the layer the user selected from the drop down in the modal.
  function importLayerSelect(){
    var value = selLayer.value;
    var layer = null;

    switch(value){
      case 'base':
      layer = source;
      break;
      case 'label':
      layer = labelSource;
      break;
      case 'icon':
      layer = iconSource;
      break;
      default:
      layer = source;
    }
    return layer;
  }
 
  // The actual interaction
  var dragAndDropInteraction = new ol.interaction.DragAndDrop({
    formatConstructors: [
    ol.format.GPX,
    ol.format.GeoJSON,
    ol.format.IGC,
    ol.format.KML,
    ol.format.TopoJSON
    ]
  });
  map.addInteraction(dragAndDropInteraction);

  //adds the features from the dropped file to the selected layer
  function addToLayer(event){
    var features = event.features;
    if (features != null && features.length > 0) {
      for (x in features){
        featureID = featureID + 1;
        features[x].setProperties({ //makes sure everything has id
          'id': featureID
        })
      }
    }
    return features;
  };
      
  //brings up modal when file dropped on page
  var dropEvent = null;
  dragAndDropInteraction.on('addfeatures', function(event) {
    $("#drag-drop-modal").modal();  
    dropEvent = event; 
  });

  //triggers on the confirmation of the modal selection
  var layerSource =null;
  $("#drop-confirm").click(function(){
    layerSource = importLayerSelect();
    features=addToLayer(dropEvent);
    layerSource.addFeatures(features); 
  });

  // allows for the deletion of feature
  function deleteFeature() {
    var features = selectedLayer.getSource().getFeatures();
    //removeInteractions();
    if (features != null && features.length > 0) {
      for (x in features) {
        var properties = features[x].getProperties();
        var id = properties.id;
        if (id == selectedFeatureID) {
          selectedLayer.getSource().removeFeature(features[x]);
          break;
        }
      }
    }
  };

  //allows feature info to be editted
  var selectedFeature = null;
  function editFeaturePassage() {
    var features = source.getFeatures();
      //removeInteractions();
      if (features != null && features.length > 0) {
       for (x in features) {
        var properties = features[x].getProperties();
        var id = properties.id;
        var pass = properties.passage;
        if (id == selectedFeatureID) {
          console.log(id);
          document.getElementById('pop-textarea').value = pass;
          selectedFeature = features[x];
          break;
        }
      }
    }
  };

  //triggers when buttin clicked
  $("#modFeatButton").click(function(){
    addSelectMod();
  });

  //Gets user input for label and creates the point geom for user to drop.
  $("#createLabel").click(function() {
    var name = document.getElementById('lab').value;
    resetType();
    labelDraw = new ol.interaction.Draw({
      source: labelSource,
      type: /** @type {ol.geom.GeometryType} */ ('Point')
    });

    labelDraw.on('drawend', function (event) {
      featureID = featureID + 1;
      event.feature.setProperties({
        'id': featureID,
        'la_name': name
      })
      map.removeInteraction(labelDraw);
      removeInteractions();
      addFeatureInteractions();
    })
    map.addInteraction(labelDraw);
    document.getElementById('lab').value = '';
  });

  //gets the selected icon and allows user to drop it
  $("#createIcon").click(function() {
    var icon = './res/'+document.getElementById('icon').value + '.png';
    resetType();
    iconDraw = new ol.interaction.Draw({
      source: iconSource,
      type: /** @type {ol.geom.GeometryType} */ ('Point')
    });

    iconDraw.on('drawend', function (event) {
      featureID = featureID + 1;
      event.feature.setProperties({
        'id': featureID,
        'icon_path': icon
      })
      map.removeInteraction(iconDraw);
      removeInteractions();
      addFeatureInteractions();
    })
    map.addInteraction(iconDraw);
  });



  //will not work if it does not have an id
  $("#delete").click(function() {
    deleteFeature(); 
    removeInteractions();
    addSelectMod();
  });



  /*
   * File saving section
   */
  document.getElementById('export-png').addEventListener('click', function() {
    map.once('postcompose', function(event) {
      var canvas = event.context.canvas;
      if (navigator.msSaveBlob) {
        navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
      } else {
        canvas.toBlob(function(blob) {
          saveAs(blob, 'map.png');
        });
      }
    });
    map.renderSync();
  });

  $("#edit-pop").click(function() {
    editFeaturePassage();
  });

    //for the save modal
  $("#save-pop").click(function() {
    var pass = document.getElementById('pop-textarea').value;
    selectedFeature.setProperties({
      'passage': pass       
    })
    
  });

  function cloneSource(source){
    var features = [];
    source.forEachFeature(function(feature) {
      var clone = feature.clone();
      clone.getGeometry().transform('EPSG:3857', 'EPSG:4326');
      features.push(clone);
    });
    return features;
  };

      //brings up modal
  $("#edit").click(function() {
    var features = cloneSource(source);
    var geojsonStr = new ol.format.GeoJSON().writeFeatures(features);
    document.getElementById('js-textarea').value = geojsonStr;
  });

  //for the modal
  $("#edit-save").click(function() {
    var geojsonStr = document.getElementById('js-textarea').value;
    var file = new File([geojsonStr], "base.geojson",{type: "text/plain;charset=utf-8"});
    saveAs(file);
  });

  //save Base button
  $("#saveBase").click(function() {
    var features = cloneSource(source);
    var geojsonStr =  new ol.format.GeoJSON().writeFeatures(features);
    var file = new File([geojsonStr], "features.geojson",{type: "text/plain;charset=utf-8"});
    saveAs(file);
  });

  //save text button
  $("#saveText").click(function() {
    var features = cloneSource(labelSource);
    var geojsonStr =  new ol.format.GeoJSON().writeFeatures(features);
    var file = new File([geojsonStr], "label.geojson",{type: "text/plain;charset=utf-8"});
    saveAs(file);
  });

  //save icon button
  $("#saveIcon").click(function() {
    var features = cloneSource(iconSource);
    var geojsonStr =  new ol.format.GeoJSON().writeFeatures(features);
    var file = new File([geojsonStr], "icon.geojson",{type: "text/plain;charset=utf-8"});
    saveAs(file);
  });

  //re-centers the map when user creates feature
  var setCenter = function(lon, lat) {
    map.getView().setCenter(ol.proj.fromLonLat([
      parseFloat(lon), parseFloat(lat)
      ]));
  };

  //valisates user input for lat and long coords
  function latLongValidation() {
    var text='';
    var lat = parseFloat(document.getElementById('lat').value);
    var long = parseFloat(document.getElementById('long').value);
    if (isNaN(lat) || lat < -90 || lat > 90) {
      text = "Latitude must be a number between -90 and 90";
      document.getElementById("coordError").innerHTML = text;
      return false;
    } else if (isNaN(long) || lat < -180 || lat > 180){
      text = "Latitude must be a number between -180 and 180";
      document.getElementById("coordError").innerHTML = text;
      return false;
    } else {
      document.getElementById("coordError").innerHTML = text;
      return true;
      
    }
    
  }

  //function that creates the feature by lat and long
  $("#create").click(function(){
    if (latLongValidation()){

      var lat = parseFloat(document.getElementById('lat').value);
      var long = parseFloat(document.getElementById('long').value);
      var text = document.getElementById('popupText').value;

      var coordinate = new ol.proj.fromLonLat([long, lat]);
      var newFeature = new ol.Feature({
        geometry: new ol.geom.Point(coordinate)
      });
      featureID = featureID + 1
      newFeature.setProperties({
        'id': featureID,
        'passage': text
      });

      source.addFeature(newFeature);
      setCenter(long,lat);
      
      document.getElementById('lat').value = '';
      document.getElementById('long').value = '';
      document.getElementById('popupText').value = '';
    }
  });



  /*
   * Toggling of sidebar 
   */
  var toggleTime = 250;
  $(document).ready(function(){
    $("#modFeatButton").click(function(){
      $("div.initHide").hide(toggleTime);
      $("#modDiv").toggle(toggleTime);
    });
  });

  $(document).ready(function(){
    $("#drawFeatButton").click(function(){
      $("div.initHide").hide(toggleTime);
      $("#drawDiv").toggle(toggleTime);
    });
  });

  $(document).ready(function(){
    $("#createFeatButton").click(function(){
      $("div.initHide").hide(toggleTime);
      document.getElementById('popupText').value='';
      $("#createDiv").toggle(toggleTime);
    });
  });

  $(document).ready(function(){
    $("#createLabelButton").click(function(){
      $("div.initHide").hide(toggleTime);
      $("#labelDiv").toggle(toggleTime);
    });
  });

  $(document).ready(function(){
    $("#createIconButton").click(function(){
      $("div.initHide").hide(toggleTime);
      $("#iconDiv").toggle(toggleTime);
    });
  });

  $(document).ready(function(){
    $("#editFeatButton").click(function(){
      $("div.initHide").hide(toggleTime);
      addSelectMod();
      $("#editDiv").toggle(toggleTime);
    });
  });

  $(document).ready(function(){
    $("#exportButton").click(function(){
      $("div.initHide").hide(toggleTime);
      $("#exportDiv").toggle(toggleTime);
    });
  });