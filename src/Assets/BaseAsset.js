import { Marker } from 'leaflet';
import { EventEmitter } from '../EventEmitter';

export var BaseAsset = Marker.extend({
  initialize: function(options, properties) {
    Marker.prototype.initialize.call(this, options.latlng);
    this._map = options._map;
    var data = options.data;

    this.poolListener = [];

    this.assetCanMove = false;
    this.assetCanSelect = false;
    this.assetSelected = false;

    this._initData(data, properties);
    this._createObserver();

    // this._createPopup();
    // this._addEventListener(this);
  },

  _initData(data, properties) {
    this.assetProperties = properties;
    this.assetId = data.id;
    this.assetType = data.type;
    this.assetLatitude = data.latitude;
    this.assetLongitude = data.longitude;
  },

  _createPopup() {
    this.bindPopup(this.feature.properties.name);
  },

  _createObserver() {
    this.assetObserver = new EventEmitter();

    const events = {
      // click: message => {
      //     console.log('click');
      //     // this.open
      // },
      // hover: message => {
      //     // console.log('hover')
      // },
      toggle: message => {
        this.assetSelected = !this.assetSelected;
        this.feature.assetSelected = this.assetSelected;
      },

      selected: message => {
        this.assetSelected = true;
      },

      unSelected: message => {
        this.assetSelected = false;
      }
    };

    this.assetObserver.addListeners(events);
  },

  _addEventListener(layer) {
    layer.on('click', event => {
      const message = {
        originEvent: event,
        data: this.feature
      };
      this.observer.emitEvent('click', [message]);
    });

    layer.on('mouseover', event => {
      const message = {
        originEvent: event,
        data: this.feature
      };
      this.observer.emitEvent('hover', message);
    });

    layer.on('mouseout', event => {
      const message = {
        originEvent: event,
        data: this.feature
      };
      this.observer.emitEvent('hover', message);
    });
  },

  // onSeleted() {
  //   this.assetSelected = true;
  // },

  // unSeleted() {
  //   this.assetSelected = false;
  // },

  isSeleted() {
    return this.assetSelected;
  },

  action(type) {
    this.assetObserver.emitEvent(type);
  }
});

export function baseAsset(options, properties) {
  return new BaseAsset(options, properties);
}
