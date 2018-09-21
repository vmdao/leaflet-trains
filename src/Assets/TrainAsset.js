import { Util, latLng } from 'leaflet';
import {
  convertToTimeHuman,
  getDirectionPoints,
  computeSegmentHeading
} from '../Util';
import { BaseAsset } from './BaseAsset';
import { trainIcon } from '../Layers/TrainIcon';

export var TrainAsset = BaseAsset.extend({
  initialize: function(type, latlng, options) {
    this.networkMap = options.networkMap || null;
    this._map = options._map || null;

    BaseAsset.prototype.initialize.call(this, type, latlng, options);
    this.canMove = true;
    this._createPopupEventSameTooltip(options.properties);
    this._createIcon(options);
  },

  _createPopup(data) {
    const _data = {
      trainNo: data.trainNo,
      trainId: data.id,
      coupled: data.coupled ? 'Yes' : 'No',
      lastReport: convertToTimeHuman(
        data.LastReport || '2018-09-10T05:01:45.702Z'
      ),
      destination: data.segment.route.name || 'Mock_Destination',
      lastStation:
        data.segment.departureStation.stationName || 'Mock_LastStation',
      nextStation: data.segment.arrivalStation.stationName || 'Mock_NextStation'
    };

    var fieldsMatch = [
      {
        name: 'Train No',
        field: 'trainNo'
      },
      {
        name: 'Coupled train',
        field: 'coupled'
      },
      {
        name: 'Last report',
        field: 'lastReport'
      },
      {
        name: 'Destination',
        field: 'destination'
      },
      {
        name: 'Last station',
        field: 'lastStation'
      },
      {
        name: 'Next station',
        field: 'nextStation'
      }
    ];

    var htmlTemplate = this.getHtmlTemplatePopup(fieldsMatch);
    var html = Util.template(htmlTemplate, _data);
    this.bindPopup(html, { minWidth: 270, className: 'leaflet-trains-popup' });
  },

  _createPopupEventSameTooltip(data) {
    this._createPopup(data);
    this.on('mouseover', () => {
      this.changeStyleWhenHover('#c6c6c6');
      this.openPopup();
    });
    this.on('mouseout', () => {
      this.changeStyleWhenHover('');
      this.closePopup();
    });
  },

  _createIcon(options) {
    const angle = this.getAngleWithNextStation();
    const _options = Object.assign({ angle: angle }, options);
    const icon = trainIcon(_options);
    this.setIcon(icon);
  },

  changeStyleWhenHover(color) {
    const assets = this._icon.getElementsByClassName(
      'leaflet-trains-train-asset'
    );
    const assetsName = this._icon.getElementsByClassName(
      'leaflet-trains-train-asset-name'
    );
    const assetsArrow = this._icon.getElementsByClassName('train-arrow-after');

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

  updatePosition(latlng) {
    var newLatLng = new L.LatLng(latlng);
    this.setLatLng(newLatLng);
    this._createIcon(this.feature);
  },

  getHtmlTemplatePopup(fieldsMatch) {
    var htmlData = fieldsMatch.reduce((current, next) => {
      current +=
        '<li class="leaflet-trains-popup-list-item"><div class="leaflet-trains-popup-list-item-name">' +
        next.name +
        '</div><div class="leaflet-trains-popup-list-item-value">{' +
        next.field +
        '}</div></li>';
      return current;
    }, '');

    var htmlTemplate =
      '<div class="leaflet-trains-popup"><div class="leaflet-trains-popup-wrapper"><div class="leaflet-trains-popup-head"><span class="leaflet-trains-popup-head-name"></span><span class="leaflet-trains-popup-head-value">{trainNo}</span></div><div class="leaflet-trains-popup-body"><ul class="leaflet-trains-popup-list"> ' +
      htmlData +
      ' </ul></div></div></div>';
    return htmlTemplate;
  },

  getDirection() {
    const paths = this.getLocationNetworkMap();
    const lastStation = this.feature.properties.segment.departureStation;
    const nextStation = this.feature.properties.segment.arrivalStation;

    const stations = this.networkMap.getLayers()[0].feature.properties.Stations;
    const indexLastSation = stations.findIndex(
      s => s.station.id === lastStation.id
    );
    const indexNextSation = stations.findIndex(
      s => s.station.id === nextStation.id
    );
    if (indexNextSation > indexLastSation) {
      paths.reverse();
    }

    return paths;
  },

  getAngle() {
    const paths = this.getDirection();
    const locationTrain = this.getLatLng();
    const locationNearTrain = this.getLocationNearTrain(paths, locationTrain);
    const locationNextTrain = this.getPointNearNextTrain(
      paths,
      locationNearTrain.index,
      locationTrain
    );

    const location1 = locationNearTrain.location;
    const location2 = locationNextTrain;

    const vector =
      paths.length - 1 === locationNearTrain.index
        ? [location2, location1]
        : [location1, location2];

    const direction = getDirectionPoints(this._map, vector);
    const angle = computeSegmentHeading(direction[0], direction[1]);

    return angle;
  },

  getAngleWithNextStation() {
    const arrivalStation = this.feature.properties.segment.arrivalStation;
    const longitudeNextStation = arrivalStation.longitude;
    const latitudeNextStation = arrivalStation.latitude;
    const nextStation = latLng(latitudeNextStation, longitudeNextStation);

    const locationTrain = this.getLatLng();

    const location1 = locationTrain;
    const location2 = nextStation;

    const vector = [location1, location2];

    const direction = getDirectionPoints(this._map, vector);
    const angle = computeSegmentHeading(direction[0], direction[1]);
    return angle;
  },

  getLocationNetworkMap() {
    const layers = this.networkMap.getLayers();
    return layers.reduce((current, next) => {
      const loc = next.getLatLngs();
      current = current.concat(loc);
      return current;
    }, []);
  },

  getLocationNearTrain(paths, locationTrain) {
    return paths.reduce(
      (current, next, index) => {
        const distance = next.distanceTo(locationTrain);
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

  getPointNearNextTrain(paths, nearIndex, locationTrain) {
    return paths[nearIndex + 1] || locationTrain;
  }
});

export function trainAsset(latlng, options) {
  return new TrainAsset('train', latlng, options);
}
