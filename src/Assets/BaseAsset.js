import { DivIcon, Marker } from 'leaflet';
import { EventEmitter } from '../EventEmitter';

export var BaseAsset = Marker.extend({
    initialize: function (type, latlng, options) {
        this.feature = options;
        this.poolListener = [];
        this.type = type;
        this.selected = false;
        this.canMove = false;
        const htmlStationIcon = type === 'station' ? '<div><img style="width:100%; height:100%" src="subway-sign.svg"></div>' : '<div><img style="width:100%; height:100%" src="subway-train.svg"></div>'
        const sizeIcon = type === 'station' ? [28, 28] : [20, 20];
        const icon = new DivIcon({
            iconSize: sizeIcon,
            html: htmlStationIcon
        });

        const _options = { icon: icon };

        Marker.prototype.initialize.call(this, latlng, _options);
        this._createPopup();
        this._createObserver();
        // this._addEventListener(this);
    },

    _createPopup() {
        this.bindPopup(this.feature.properties.name)
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
                this.selected = true
            },

            unSelected: message => {
                this.selected = false;
            }
        }

        this.observer.addListeners(events);
    },

    _addEventListener(layer) {

        layer.on('click', (event) => {
            const message = {
                originEvent: event,
                data: this.feature
            }
            this.observer.emitEvent('click', [message])
        })

        layer.on('mouseover', (event) => {
            const message = {
                originEvent: event,
                data: this.feature
            }
            this.observer.emitEvent('hover', message)
        })

        layer.on('mouseout', (event) => {
            const message = {
                originEvent: event,
                data: this.feature
            }
            this.observer.emitEvent('hover', message)
        })
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
        this.observer.emitEvent(type)
    }
});

export function baseAsset(type, latlng, options) {
    return new BaseAsset(type, latlng, options);
}