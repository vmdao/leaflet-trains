import { Util } from 'leaflet';
import { convertToTimeHuman } from '../Util';
import { BaseAsset } from './BaseAsset';

export var TrainAsset = BaseAsset.extend({
  initialize: function(type, latlng, options) {
    BaseAsset.prototype.initialize.call(this, type, latlng, options);
    this.canMove = true;
    this._createPopup(options.feature);
  },
  _createPopup(data) {
    data = {
      trainName: 'TH-756',
      trainId: 756,
      coupled: true,
      lastReport: convertToTimeHuman('2018-09-10T05:01:45.702Z'),
      destimation: 'Melbourne',
      lastStation: 'XXX',
      nextStation: 'YYY'
    };

    var fieldsMatch = [
      {
        name: 'Train Id',
        field: 'trainId'
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
        name: 'Destimation',
        field: 'destimation'
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
    var html = Util.template(htmlTemplate, data);
    this.bindPopup(html, { minWidth: 270 });
  },

  updatePosition(latlng) {
    var newLatLng = new L.LatLng(latlng);
    this.setLatLng(newLatLng);
  },

  getHtmlTemplatePopup(data) {
    var htmlData = data.reduce((current, next) => {
      current +=
        '<li class="leaflet-trains-popup-list-item"><div class="leaflet-trains-popup-list-item-name">' +
        next.name +
        '</div><div class="leaflet-trains-popup-list-item-value">{' +
        next.field +
        '}</div></li>';
      return current;
    }, '');

    var htmlTemplate =
      '<div class="leaflet-trains-popup"><div class="leaflet-trains-popup-wrapper"><div class="leaflet-trains-popup-head"><span class="leaflet-trains-popup-head-name"></span><span class="leaflet-trains-popup-head-value">TH{trainId}</span></div><div class="leaflet-trains-popup-body"><ul class="leaflet-trains-popup-list"> ' +
      htmlData +
      ' </ul></div></div></div>';
    return htmlTemplate;
  }
});

export function trainAsset(latlng, options) {
  return new TrainAsset('train', latlng, options);
}
