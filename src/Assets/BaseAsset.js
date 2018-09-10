import { DivIcon, Marker } from 'leaflet';
import { EventEmitter } from '../EventEmitter';

export var BaseAsset = Marker.extend({
  initialize: function(type, latlng, options) {
    const _options = { icon: options.icon };
    Marker.prototype.initialize.call(this, latlng, _options);

    this.feature = options;
    this.poolListener = [];
    this.type = type;
    this.selected = false;
    this.canMove = false;

    this._createObserver();

    // this._createPopup();
    // this._addEventListener(this);
  },

  _createPopup() {
    this.bindPopup(this.feature.properties.name);
  },

  _createObserver() {
    this.observer = new EventEmitter();
    const events = {
      // click: message => {
      //     console.log('click');
      //     // this.open
      // },
      // hover: message => {
      //     // console.log('hover')
      // },
      toggle: message => {
        this.selected = !this.selected;
        this.feature.selected = this.selected;
      },

      selected: message => {
        this.selected = true;
      },

      unSelected: message => {
        this.selected = false;
      }
    };

    this.observer.addListeners(events);
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

  onSeleted() {
    this.selected = true;
  },

  unSeleted() {
    this.selected = false;
  },

  isSeleted() {
    return this.selected;
  },

  action(type) {
    this.observer.emitEvent(type);
  }
});

export function baseAsset(type, latlng, options) {
  return new BaseAsset(type, latlng, options);
}
