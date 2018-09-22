import { latLng } from 'leaflet';
import {
  getDirectionPoints,
  computeSegmentHeading
} from '../Util';

import { BaseAsset } from './BaseAsset';
import { trainIcon } from '../Layers/TrainIcon';

export var TrainAsset = BaseAsset.extend({
  initialize: function (options, properties) {
    BaseAsset.prototype.initialize.call(this, options, properties);
    var popup = options.popup;
    var data = options.data;
    this.networkMap = options.networkMap || null;

    this.assetCanMove = true;
    this.assetCanSelect = true;
    this.assetSelected = false;

    this._createIcon(data);
    this._createPopupEventSameTooltip(popup, properties);
  },

  _initData(data, properties) {
    this.assetProperties = properties;
    this.assetId = data.id;
    this.assetType = data.type;
    this.assetLatitude = data.latitude;
    this.assetLongitude = data.longitude;
    this.assetName = data.name;
    this.assetLastStationId = data.lastStation.id;
    this.assetLastStationName = data.lastStation.name;
    this.assetLastStationLatitude = data.lastStation.latitude;
    this.assetLastStationLongitude = data.lastStation.longitude;

    this.assetNextStationId = data.nextStation.id;
    this.assetNextStationName = data.nextStation.name;
    this.assetNextStationLatitude = data.nextStation.latitude;
    this.assetNextStationLongitude = data.nextStation.longitude;

    this.assetRouteId = data.route.rountId;
    this.assetRouteName = data.route.routeName;
    this.assetRouteLineId = data.route.lineId;
    this.assetRouteLineName = data.route.lineName;
  },

  _createPopup(popup) {
    var fieldsMatch = popup.list || [
      {
        name: 'Train No',
        field: 'trainNo',
        value: this.assetsName
      },
      {
        name: 'Last station',
        field: 'lastStation',
        value: this.assetLastStationName
      },
      {
        name: 'Next station',
        field: 'nextStation',
        value: this.assetNextStationName
      }
    ];

    var html = this._getHtmlTemplatePopup(fieldsMatch);
    this.bindPopup(html, { minWidth: 270, className: 'leaflet-trains-popup' });
  },

  _createIcon(properties) {
    var angle = this._getAngleWithNextStation();
    var icon = trainIcon({ angle: angle }, properties);
    this.setIcon(icon);
  },

  _createPopupEventSameTooltip(popup, properties) {
    this._createPopup(popup, properties);
    this.on('mouseover', () => {
      this._changeStyleWhenHover('#c6c6c6');
      this.openPopup();
    });
    this.on('mouseout', () => {
      this._changeStyleWhenHover('');
      this.closePopup();
    });
  },

  _changeStyleWhenHover(color) {
    var assets = this._icon.getElementsByClassName(
      'leaflet-trains-train-asset'
    );
    var assetsName = this._icon.getElementsByClassName(
      'leaflet-trains-train-asset-name'
    );
    var assetsArrow = this._icon.getElementsByClassName('train-arrow-after');

    if (assets.length) {
      assets[0].style.backgroundColor = color;
    }
    if (assetsName && assetsName.length) {
      assetsName[0].style.backgroundColor = color;
    }
    if (assetsArrow && assetsArrow.length) {
      assetsArrow[0].style.borderBottomColor = color;
    }
  },

  _getHtmlTemplatePopup(fieldsMatch) {
    var htmlData = fieldsMatch.reduce((current, next) => {
      current +=
        '<li class="leaflet-trains-popup-list-item"><div class="leaflet-trains-popup-list-item-name">' +
        next.name +
        '</div><div class="leaflet-trains-popup-list-item-value">' +
        next.value +
        '</div></li>';
      return current;
    }, '');

    var htmlTemplate =
      '<div class="leaflet-trains-popup"><div class="leaflet-trains-popup-wrapper"><div class="leaflet-trains-popup-head"><span class="leaflet-trains-popup-head-name"></span><span class="leaflet-trains-popup-head-value">' +
      this.assetName +
      '</span></div><div class="leaflet-trains-popup-body"><ul class="leaflet-trains-popup-list"> ' +
      htmlData +
      ' </ul></div></div></div>';
    return htmlTemplate;
  },

  _getDirection() {
    var paths = this._getLocationNetworkMap();
    var lastStation = this.feature.properties.segment.departureStation;
    var nextStation = this.feature.properties.segment.arrivalStation;

    var stations = this.networkMap.getLayers()[0].feature.properties.Stations;
    var indexLastSation = stations.findIndex(
      s => s.station.id === lastStation.id
    );
    var indexNextSation = stations.findIndex(
      s => s.station.id === nextStation.id
    );
    if (indexNextSation > indexLastSation) {
      paths.reverse();
    }

    return paths;
  },

  _getAngle() {
    var paths = this._getDirection();
    var locationTrain = this.getLatLng();
    var locationNearTrain = this._getLocationNearTrain(paths, locationTrain);
    var locationNextTrain = this._getPointNearNextTrain(
      paths,
      locationNearTrain.index,
      locationTrain
    );

    var location1 = locationNearTrain.location;
    var location2 = locationNextTrain;

    var vector =
      paths.length - 1 === locationNearTrain.index
        ? [location2, location1]
        : [location1, location2];

    var direction = getDirectionPoints(this._map, vector);
    var angle = computeSegmentHeading(direction[0], direction[1]);

    return angle;
  },

  _getAngleWithNextStation() {
    var longitudeNextStation = this.assetNextStationLongitude;
    var latitudeNextStation = this.assetNextStationLatitude;

    var nextStation = latLng(latitudeNextStation, longitudeNextStation);

    var locationTrain = this.getLatLng();

    var location1 = locationTrain;
    var location2 = nextStation;
    var vector = [location1, location2];

    var direction = getDirectionPoints(this._map, vector);
    var angle = computeSegmentHeading(direction[0], direction[1]);
    return angle;
  },

  _getLocationNetworkMap() {
    var layers = this.networkMap.getLayers();
    return layers.reduce((current, next) => {
      var loc = next.getLatLngs();
      current = current.concat(loc);
      return current;
    }, []);
  },

  _getLocationNearTrain(paths, locationTrain) {
    return paths.reduce(
      (current, next, index) => {
        var distance = next.distanceTo(locationTrain);
        if (distance > current.distance) {
          return current;
        }
        return {
          distance: distance,
          location: next,
          index: index
        };
      },
      {
        distance: Infinity,
        location: null,
        index: 0
      }
    );
  },

  _getPointNearNextTrain(paths, nearIndex, locationTrain) {
    return paths[nearIndex + 1] || locationTrain;
  },

  updateData(data, properties) {
    this._initData(data, properties);
    this.updatePosition([this.assetLatitude, this.assetLongitude]);
    this._createIcon(data);
  },

  updatePosition(latlng) {
    var newLatLng = latLng(latlng);
    this.setLatLng(newLatLng);
  }
});

export function trainAsset(options, properties) {
  return new TrainAsset(options, properties);
}
