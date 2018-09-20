import { Map, Util, LatLngBounds } from 'leaflet';

Map.mergeOptions({
  boxZoom: false,
  areaSelect: true
});

export var AreaSelect = Map.BoxZoom.extend({
  _onMouseUp: function(e) {
    if (e.which !== 1 && e.button !== 1) {
      return;
    }

    this._finish();

    if (!this._moved) {
      return;
    }

    this._clearDeferredResetState();
    this._resetStateTimeout = setTimeout(Util.bind(this._resetState, this), 0);

    var bounds = new LatLngBounds(
      this._map.containerPointToLatLng(this._startPoint),
      this._map.containerPointToLatLng(this._point)
    );
    this._map.fire('areaSelect', { areaSelectBounds: bounds, event: e });
  }
});

// @section Handlers
// @property boxZoom: Handler
// Box (shift-drag with mouse) zoom handler.
Map.addInitHook('addHandler', 'areaSelect', AreaSelect);
