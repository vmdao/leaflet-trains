import { Marker } from 'leaflet';
import { EventEmitter } from '../EventEmitter';

export var BaseAsset = Marker.extend({
  initialize: function (options, properties) {
    Marker.prototype.initialize.call(this, options.latlng);
    this._map = options._map;
    var data = options.data;

    this.poolListener = [];

    this.assetCanMove = false;
    this.assetCanSelect = false;
    this.assetSelected = false;

    this._initData(data, properties);
    this._createObserver();
  },

  _initData: function (data, properties) {
    this.assetProperties = properties;
    this.assetId = data.id;
    this.assetType = data.type;
    this.assetLatitude = data.latitude;
    this.assetLongitude = data.longitude;
  },

  _createObserver: function () {
    this.assetObserver = new EventEmitter();

    var events = {
      toggle: () => {
        this.toggleSelect();
      },

      selected: () => {
        this.assetSelected = true;
      },

      unSelected: () => {
        this.assetSelected = false;
      }
    };

    this.assetObserver.addListeners(events);
  },

  _addEventListener: function (layer) {
    layer.on('click', event => {
      var message = {
        originEvent: event,
        data: this.feature
      };
      this.assetObserver.emitEvent('click', [message]);
    });

    layer.on('mouseover', event => {
      var message = {
        originEvent: event,
        data: this.feature
      };
      this.assetObserver.emitEvent('hover', message);
    });

    layer.on('mouseout', event => {
      var message = {
        originEvent: event,
        data: this.feature
      };
      this.assetObserver.emitEvent('hover', message);
    });
  },

  isSeleted: function () {
    return this.assetSelected;
  },

  action: function (message) {
    this.assetObserver.emitEvent(message.action, [message.data]);
  },

  toggleSelect: function () {
    this.assetSelected = !this.assetSelected;
  }

});

export function baseAsset(options, properties) {
  return new BaseAsset(options, properties);
}
