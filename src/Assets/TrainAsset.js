import { Util } from 'leaflet';
import { convertToTimeHuman } from '../Util';
import { BaseAsset } from './BaseAsset';
import { trainIcon } from '../Layers/TrainIcon';

export var TrainAsset = BaseAsset.extend({
  initialize: function (type, latlng, options) {
    const icon = trainIcon(options);
    const _options = Object.assign({ icon: icon }, options);
    BaseAsset.prototype.initialize.call(this, type, latlng, _options);
    this.networkMap = options.networkMap || null;
    this.canMove = true;
    this._createPopup(options.properties);
  },

  _createPopup(data) {
    const _data = {
      trainNo: data.TrainNo,
      trainId: data.Id,
      coupled: data.Coupled ? 'Yes' : 'No',
      lastReport: convertToTimeHuman(
        data.LastReport || '2018-09-10T05:01:45.702Z'
      ),
      destimation: data.DestinationStation || 'Mock_Destination',
      lastStation: data.LastStation || 'Mock_LastStation',
      nextStation: data.NextStation || 'Mock_NextStation'
    };

    var fieldsMatch = [
      {
        name: 'Train Id',
        field: 'trainId'
      },
      {
        name: 'TrainNo',
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
    var html = Util.template(htmlTemplate, _data);
    this.bindPopup(html, { minWidth: 270 });
  },

  updatePosition(latlng) {
    var newLatLng = new L.LatLng(latlng);
    this.setLatLng(newLatLng);
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
      '<div class="leaflet-trains-popup"><div class="leaflet-trains-popup-wrapper"><div class="leaflet-trains-popup-head"><span class="leaflet-trains-popup-head-name"></span><span class="leaflet-trains-popup-head-value">TH-{trainNo}</span></div><div class="leaflet-trains-popup-body"><ul class="leaflet-trains-popup-list"> ' +
      htmlData +
      ' </ul></div></div></div>';
    return htmlTemplate;
  }

});

export function trainAsset(latlng, options) {
  return new TrainAsset('train', latlng, options);
}
