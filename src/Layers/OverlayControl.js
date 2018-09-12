import { Control, DomUtil } from 'leaflet';
const Layers = Control.Layers;

export var OverlayControl = Layers.extend({
  onAdd: function() {
    this._initLayout();
    this._customizeOverlays();
    this._update();
    return this._container;
  },
  _customizeOverlays: function() {
    var element = this._container;
    var img = DomUtil.create('img', 'my-button-class', element);
    img.src = 'assets/images/ic-marker-station.svg';
  }
});

export var overlayControl = function(options) {
  return new OverlayControl(options);
};
