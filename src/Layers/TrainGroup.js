import { GeoJSON } from 'leaflet';
import { trainAsset } from '../Assets/TrainAsset';

export var TrainGroup = GeoJSON.extend({
  initialize: function(data, options) {
    GeoJSON.prototype.initialize.call(this, data, options);
  }
});

export var trainGroup = function(trains, options) {
  var trainGeoJson = createTemplateGeoJson(trains);
  var _options = Object.assign(
    {
      pointToLayer: pointToLayer
    },
    options
  );
  return new TrainGroup(trainGeoJson, _options);
};

var createTemplateGeoJson = function(trains) {
  return trains.reduce(
    (current, next) => {
      var data = next.data;
      var template = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [data.longitude, data.latitude]
        },
        id: data.id,
        properties: next
      };

      current.features.push(template);
      return current;
    },
    { type: 'FeatureCollection', features: [] }
  );
};

var pointToLayer = function(feature, latlng) {
  try {
    var data = feature.properties.data;
    var properties = feature.properties.properties;

    var trainData = {
      id: data.id,
      type: 'TRAIN',
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      nextStation: {
        id: data.nextStation.id,
        name: data.nextStation.name,
        latitude: data.nextStation.latitude,
        longitude: data.nextStation.longitude
      },
      lastStation: {
        id: data.lastStation.id,
        name: data.lastStation.name,
        latitude: data.lastStation.latitude,
        longitude: data.lastStation.longitude
      },
      route: {
        routeId: data.routeId,
        rountName: data.rountName,
        lineId: data.lineId,
        lineName: data.lineName
      }
    };

    var options = {
      latlng: latlng,
      data: trainData,
      popup: feature.properties.popup
    };

    return trainAsset(options, properties);
  } catch (error) {
    console.log(error);
  }
};
