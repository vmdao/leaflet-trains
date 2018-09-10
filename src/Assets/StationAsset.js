import { BaseAsset } from './BaseAsset';
import { stationIcon } from '../Layers/StationIcon';

export var StationAsset = BaseAsset.extend({
  initialize: function(type, latlng, options) {
    const icon = stationIcon(latlng, options);
    const _options = Object.assign({ icon: icon }, options);
    BaseAsset.prototype.initialize.call(this, type, latlng, _options);
  }
});

export function stationAsset(latlng, options) {
  return new StationAsset('station', latlng, options);
}
