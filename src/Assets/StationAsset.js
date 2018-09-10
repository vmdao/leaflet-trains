import { BaseAsset } from './BaseAsset';

export var StationAsset = BaseAsset.extend({
  initialize: function(type, latlng, options) {
    BaseAsset.prototype.initialize.call(this, type, latlng, options);
  }
});

export function stationAsset(latlng, options) {
  return new StationAsset('station', latlng, options);
}
