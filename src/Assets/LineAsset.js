import { Polyline } from 'leaflet';
import { EventEmitter } from '../EventEmitter';

export var LineAsset = Polyline.extend({
    initialize: function (latlngs, options) {
        this.poolListener = [];
        this.selected = false;
        Polyline.prototype.initialize.call(this, latlngs, options);
    },

    seleted() {
        this.selected = true;
    },

    unSeleted() {
        this.selected = false;
    },
    isSeleted() {
        return this.selected;
    }

});

export function lineAsset(latlngs, options) {
    return new LineAsset(type, latlngs, options);
}