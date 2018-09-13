import { Map, Handler } from 'leaflet';

export var KeyboardHook = Handler.extend({
  addHooks: function() {
    this._map.on('contextmenu', this._onDown, this);
  },
  removeHooks: function() {
    this._map.off('contextmenu', this._onDown, this);
  },

  _onDown: function(e) {
    var map = this._map,
      oldZoom = map.getZoom(),
      delta = map.options.zoomDelta,
      zoom = e.originalEvent.shiftKey ? oldZoom - delta : oldZoom + delta;

    if (map.options.doubleClickZoom === 'center') {
      map.setZoom(zoom);
    } else {
      map.setZoomAround(e.containerPoint, zoom);
    }
  }
});

Map.addInitHook('addHandler', 'keyboard', KeyboardHook);
