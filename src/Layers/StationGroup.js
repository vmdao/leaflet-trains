import { GeoJSON } from 'leaflet';
import { stationAsset } from '../Assets/StationAsset';
import { trainAsset } from '../Assets/TrainAsset';

export var StationGroup = GeoJSON.extend({});

export var stationGroup = function(stations, options) {
  var stationGeoJson = createTemplateGeoJson(stations);
  var _options = Object.assign(
    {
      pointToLayer: pointToLayer
    },
    options
  );
  return new StationGroup(stationGeoJson, _options);
};

var createTemplateGeoJson = function(stations) {
  return stations.reduce(
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
  var properties = feature.properties;
  var data = {
    id: properties.id,
    type: 'STATION',
    name: properties.stationName,
    latitude: properties.latitude,
    longitude: properties.longitude
  };

  var options = { latlng: latlng, data: data };

  return stationAsset(options, properties);
};
