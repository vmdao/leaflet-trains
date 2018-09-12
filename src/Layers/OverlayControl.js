import { Control } from 'leaflet';
const Layers = Control.Layers;

export var OverlayControl = Layers.extend({
  initialize: function(options) {
    console.log(123);
  },
  onAdd: function() {
    this._initLayout();
    this._customizeButton();
    return this._container;
  },
  _customizeButton: function() {
    console.log('123');
  }
});

export var overlayControl = function(options) {
  return new OverlayControl(options);
};
