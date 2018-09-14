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
  },
  _setPanDelta: function(panDelta) {
    var keys = (this._panKeys = {}),
      codes = this.keyCodes,
      i,
      len;

    for (i = 0, len = codes.left.length; i < len; i++) {
      keys[codes.left[i]] = [-1 * panDelta, 0];
    }
    for (i = 0, len = codes.right.length; i < len; i++) {
      keys[codes.right[i]] = [panDelta, 0];
    }
    for (i = 0, len = codes.down.length; i < len; i++) {
      keys[codes.down[i]] = [0, panDelta];
    }
    for (i = 0, len = codes.up.length; i < len; i++) {
      keys[codes.up[i]] = [0, -1 * panDelta];
    }
  }
});

Map.addInitHook('addHandler', 'keyboard', KeyboardHook);
