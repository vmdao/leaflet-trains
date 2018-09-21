import { EventEmitter } from './EventEmitter';
import { Map, GeoJSON, layerGroup, latLng } from 'leaflet';
import { overlayControl } from './Layers/OverlayControl';
import { basemapLayer } from './Layers/BasemapLayer';
import { stationAsset } from './Assets/StationAsset';
import { trainAsset } from './Assets/TrainAsset';

export class EnouvoTrains {
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
    var events = {
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

  _addEventListenerMap(feature, layer) {
    var label =
      feature.geometry.type === 'LineString'
        ? 'Line: ' + feature.properties.name
        : 'Train: ' + feature.properties.name;
    layer.bindTooltip(label);
  }

  _addEventListener(feature, layer) {
    layer.on('click', event => {
      var message = {
        originEvent: event,
        data: feature.properties.properties
      };
      this.observer.emitEvent('click', [message]);
    });

    layer.on('mouseover', event => {
      var message = {
        originEvent: event,
        data: feature
      };
      this.observer.emitEvent('hover', message);
    });

    layer.on('mouseout', event => {
      var message = {
        originEvent: event,
        data: feature
      };
      this.observer.emitEvent('hover', message);
    });
  }

  setNetworkMaps(networkMapsData) {
    var that = this;
    this.networkMapsData = networkMapsData;
    var layers = [];

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
            id: data.properties.id,
            properties: data.properties
          }
        ]
      };

      const networkMap = new GeoJSON(template, {
        style: function() {
          return { weight: 7 };
        },
        onEachFeature: this._addEventListenerMap.bind(that)
      });

      layers.push(networkMap);

      networkMap.addTo(this._map);

      return {
        id: data.properties.id,
        networkMap: networkMap,
        name: data.properties.name
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
    var that = this;
    this.networkStationsData = createStationGeoJson(networkStationsData);

    this.networkStations = new GeoJSON(this.networkStationsData, {
      pointToLayer: (feature, latlng) => {
        var properties = feature.properties.properties;

        var stationData = {
          id: properties.id,
          type: 'STATION',
          name: properties.stationName,
          latitude: properties.latitude,
          longitude: properties.longitude
        };

        var options = { latlng: latlng, data: stationData };

        return stationAsset(options, properties);
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
    var that = this;

    this.networkTrainsData = createTrainGeoJson(networkTrainsData);

    this.networkTrains = new GeoJSON(this.networkTrainsData, {
      onEachFeature: this._addEventListener.bind(that),
      pointToLayer: (feature, latlng) => {
        try {
          var data = feature.properties.data;
          var properties = feature.properties.properties;
          var lineId = data.route.lineId;

          var networkMap = this.networkMaps.find(n => n.id === lineId);

          var trainData = {
            id: data.id,
            type: 'TRAIN',
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
            nextStation: {
              id: data.nextStation.id,
              name: data.nextStation.name,
              latitude: data.nextStation.latitude,
              longitude: data.nextStation.longitude
            },
            lastStation: {
              id: data.lastStation.id,
              name: data.lastStation.name,
              latitude: data.lastStation.latitude,
              longitude: data.lastStation.longitude
            },
            route: {
              routeId: data.routeId,
              rountName: data.rountName,
              lineId: data.lineId,
              lineName: data.lineName
            }
          };

          var options = {
            latlng: latlng,
            networkMap: networkMap.networkMap,
            data: trainData,
            popup: feature.properties.popup,
            _map: this._map
          };

          return trainAsset(options, properties);
        } catch (error) {
          console.log(error);
        }
      }
    });

    this.networkTrains.addTo(this._map);
    this.networkTrains.setZIndex(10000000);
    this.overlaysControl.addOverlay(this.networkTrains, 'Trains');
  }

  addTrain(trainData) {
    var data = trainData.data;
    var properties = trainData.properties;
    var latlng = latLng(data.latitude, data.longitude);
    var lineId = data.route.lineId;
    var networkMap = this.networkMaps.find(n => n.id === lineId);

    var options = Object.assign(trainData, {
      networkMap: networkMap.networkMap,
      _map: this._map,
      data: data,
      latlng: latlng
    });

    var trainLayer = trainAsset(options, properties);
    trainLayer.addTo(this._map);
    this.networkTrains.addLayer(trainLayer);
  }

  updateTrain(trainData) {
    var data = trainData.data;
    var properties = trainData.properties;
    var trainsLayer = this.networkTrains.getLayers();
    var trainFinded = trainsLayer.find(t => {
      return t.assetId === data.id;
    });

    if (trainFinded) {
      trainFinded.updateData(data, properties);
    }
    return trainFinded;
  }

  replaceTrain(trainData) {
    if (!trainData) {
      return;
    }

    const trainUpdated = this.updateTrain(trainData);

    if (!trainUpdated) {
      this.addTrain(trainData);
    }
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

  controlPopupAsset(assetId, switchPopup) {
    this.networkTrains.eachLayer(train => {
      if (train.feature.properties.id === assetId) {
        switchPopup ? train.openPopup() : train.closePopup();
      }
    });
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
      var layer = assets.find(assetId => {
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
    var layers = this.networkTrains.getLayers();
    var layersSelected = layers
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

  unSelectedAsset(id) {
    this.networkTrains.eachLayer(layer => {
      if (layer.feature.properties.id === id) {
        layer.feature.selected = false;
        layer.selected = false;
        layer.feature.properties.selected = false;
      }
    });
  }

  unSelectedAssets(assets) {
    this.networkTrains.eachLayer(l => {
      var layer = assets.find(assetId => {
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

var createStationGeoJson = function(stations) {
  return stations.reduce(
    (current, next) => {
      var data = next.data;
      var template = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [data.longitude, data.latitude]
        },
        id: data.id,
        properties: next
      };

      current.features.push(template);
      return current;
    },
    { type: 'FeatureCollection', features: [] }
  );
};

var createTrainGeoJson = function(trains) {
  return trains.reduce(
    (current, next) => {
      var data = next.data;
      var template = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [data.longitude, data.latitude]
        },
        id: data.id,
        properties: next
      };

      current.features.push(template);
      return current;
    },
    { type: 'FeatureCollection', features: [] }
  );
};
