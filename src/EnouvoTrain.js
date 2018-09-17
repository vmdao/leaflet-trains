import { Map, GeoJSON, control, layerGroup } from 'leaflet';
import { basemapLayer } from './Layers/BasemapLayer';
import { stationAsset } from './Assets/StationAsset';
import { trainAsset } from './Assets/TrainAsset';
import { KeyboardHook } from './Layers/KeyboardHook';
import { EventEmitter } from './EventEmitter';
import { overlayControl } from './Layers/OverlayControl';
export class EnouvoTrain {
  constructor(el, options) {
    this.poolListener = [];
    this.layerSelected = new Proxy([], {
      set: (target, property, value, receiver) => {
        target[property] = value;
        return true;
      }
    });
    this.networkMaps = [];

    this._createObserver();
    this._createMap(el, options);
  }

  _createObserver() {
    this.observer = new EventEmitter();
    const events = {
      click: message => {
        this.poolListener.filter(l => l.event === 'click').forEach(listener => {
          if (typeof listener.action === 'function') {
            listener.action(message);
          }
        });
      },
      hover: message => {
        this.poolListener.filter(l => l.event === 'hover').forEach(listener => {
          if (typeof listener.action === 'function') {
            listener.action(message);
          }
        });
      },

      selectedTrains: message => {
        this.poolListener
          .filter(l => l.event === 'selectedTrains')
          .forEach(listener => {
            if (typeof listener.action === 'function') {
              let layers = [];
              this.networkTrains.eachLayer(l => {
                if (l.selected) {
                  layers.push(l.feature);
                }
              });
              listener.action(message);
            }
          });
      }
    };
    this.observer.addListeners(events);
  }

  _createMap(el, options) {
    this._map = new Map(el, options);
    this._map._container.className =
      this._map._container.className + ' leaflet-trains';
    this._map.zoomControl.setPosition('bottomleft');
    this._createLayer();
    this._createOverlayControl();
    this._map.on('areaSelect', event => {
      var assets = this.selectedAssetsWithBounds(event.areaSelectBounds);
      const message = {
        originEvent: event.event,
        data: assets
      };
      this.observer.emitEvent('selectedTrains', [message]);
    });
  }

  _createLayer() {
    basemapLayer('Streets').addTo(this._map);
  }

  _createOverlayControl() {
    this.overlaysControl = overlayControl(
      [],
      {},
      {
        position: 'bottomleft',
        collapsed: false
      }
    ).addTo(this._map);
  }

  _addEventListener(feature, layer) {
    if (feature && feature.geometry.type === 'LineString') {
      const label =
        feature.geometry.type === 'LineString'
          ? 'Line: ' + feature.properties.name
          : 'Train: ' + feature.properties.name;
      layer.bindTooltip(label);
    }

    layer.on('click', event => {
      const message = {
        originEvent: event,
        data: feature
      };
      this.observer.emitEvent('click', [message]);
    });

    layer.on('mouseover', event => {
      const message = {
        originEvent: event,
        data: feature
      };
      this.observer.emitEvent('hover', message);
    });

    layer.on('mouseout', event => {
      const message = {
        originEvent: event,
        data: feature
      };
      this.observer.emitEvent('hover', message);
    });
  }

  setNetworkMaps(networkMapsData) {
    const that = this;
    this.networkMapsData = networkMapsData;
    let layers = [];
    this.networkMaps = networkMapsData.map(data => {
      const template = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: data.paths
            },
            id: data.properties.Id,
            properties: data.properties
          }
        ]
      };

      const networkMap = new GeoJSON(template, {
        style: function() {
          return { weight: 7 };
        },
        onEachFeature: this._addEventListener.bind(that)
      });
      layers.push(networkMap);
      networkMap.addTo(this._map);
      return {
        Id: data.properties.Id,
        networkMap: networkMap,
        name: data.properties.Name
      };
    });
    this.overlaysControl.addOverlay(layerGroup(layers), 'Line');
  }

  clearNetworkMaps() {
    if (this.networkMaps) {
      this.networkMaps.clearLayers();
      this.networkMapsData = null;
    }
  }

  setNetworkStations(networkStationsData) {
    const that = this;
    this.networkStationsData = networkStationsData;
    this.networkStations = new GeoJSON(networkStationsData, {
      onEachFeature: this._addEventListener.bind(that),
      pointToLayer: (feature, latlng) => {
        return feature.properties.type === 'STATION'
          ? stationAsset(latlng, feature)
          : trainAsset(latlng, feature);
      }
    });
    this.networkStations.addTo(this._map);
    this.overlaysControl.addOverlay(this.networkStations, 'Stations');
    this.networkStations.setZIndex(2);
  }

  clearNetworkStations() {
    if (this.networkStations) {
      this.networkStations.clearLayers();
      this.networkStationsData = null;
    }
  }

  setNetworkTrains(networkTrainsData) {
    const that = this;
    this.networkTrainsData = networkTrainsData;
    this.networkTrains = new GeoJSON(networkTrainsData, {
      onEachFeature: this._addEventListener.bind(that),
      pointToLayer: (feature, latlng) => {
        const lineId = feature.properties.Segment.Route.Line.Id;
        const networkMap = this.networkMaps.find(n => n.Id === lineId);
        const _feature = Object.assign(
          { networkMap: networkMap.networkMap, _map: this._map },
          feature
        );
        return feature.properties.type === 'STATION'
          ? stationAsset(latlng, _feature)
          : trainAsset(latlng, _feature);
      }
    });
    this.networkTrains.addTo(this._map);
    this.networkTrains.setZIndex(10000000);
    this.overlaysControl.addOverlay(this.networkTrains, 'Trains');
  }

  clearNetworkTrains() {
    if (this.networkTrains) {
      this.networkTrains.clearLayers();
      this.networkTrainsData = null;
    }
  }

  addListener(listener) {
    this.poolListener.push(listener);
  }

  addListeners(listeners) {
    this.poolListener = this.poolListener.concat(listeners);
  }

  setView(latLng, zoom, options) {
    this._map.setView(latLng, zoom, options);
  }

  toggleAsset(assetId) {
    this.networkTrains.eachLayer(layer => {
      if (layer.feature.id === assetId) {
        layer.action && layer.action('toggle');
      }
    });
  }

  selectedAsset(assetId) {
    this.networkTrains.eachLayer(layer => {
      if (layer.feature.id === assetId) {
        layer.feature.selected = true;
        layer.action && layer.action('selected');
      }
    });
  }

  selectedAssets(assets) {
    this.networkTrains.eachLayer(l => {
      const layer = assets.find(assetId => {
        if (assetId !== l.feature.id) {
          return false;
        }
        return l;
      });

      if (layer) {
        layer.feature.selected = true;
      }
    });
  }

  selectedAssetsWithBounds(bounds) {
    const layers = this.networkTrains.getLayers();
    const layersSelected = layers
      .filter(l => {
        return bounds.contains(l.getLatLng());
      })
      .map(l => {
        l.feature.selected = true;
        l.action && l.action('selected');
        return l.feature;
      });
    return layersSelected;
  }

  selectedAssetsAll() {
    this.networkTrains.eachLayer(l => {
      if (l) {
        l.feature.selected = true;
      }
    });
  }

  unSelectedAsset(Id) {
    this.networkTrains.eachLayer(layer => {
      if (layer.feature.properties.Id === Id) {
        layer.feature.selected = false;
        layer.selected = false;
        layer.feature.properties.selected = false;
      }
    });
  }

  unSelectedAssets(assets) {
    this.networkTrains.eachLayer(l => {
      let layer = assets.find(assetId => {
        if (assetId !== l.feature.id) {
          return false;
        }
        return l;
      });

      if (layer) {
        layer.feature.selected = false;
      }
    });
  }

  unSelectedAssetsAll() {
    this.networkTrains.eachLayer(layer => {
      if (layer) {
        layer.feature.selected = false;
        layer.selected = false;
        layer.feature.properties.selected = false;
      }
    });
  }
}

export function enouvoTrainInit(el, options) {
  return new EnouvoTrain(el, options);
}
