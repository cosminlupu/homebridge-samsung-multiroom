var Service, Characteristic, sm;
const SamsungMultiroom = require('samsung-multiroom');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

  homebridge.registerAccessory('homebridge-samsung-multiroom', 'SamsungMultiroom', SamsungMultiroomAccessory);
}

function SamsungMultiroomAccessory(log,config, api){
    this.log = log;
    this.host = config['host'];
    this.name = config['name'];
    this.port = config['port'] || 55001;

    sm = new SamsungMultiroom({
        host: this.host,
        port: this.port
    });

    this.volumeService = new Service.Lightbulb(this.name, "volumeService");

    this.volumeService
    .getCharacteristic(Characteristic.On)
    .on('get', this.getMuteState.bind(this))
    .on('set', this.setMuteState.bind(this));

    this.volumeService
    .addCharacteristic(new Characteristic.Brightness())
    .on('get', this.getVolume.bind(this))
    .on('set', this.setVolume.bind(this));
}

SamsungMultiroomAccessory.prototype.getMuteState = function(callback) {
    sm.getMute( (error, mute) => {
        if(error){
            this.log(`${this.name} speaker couldn't return mute state.`);
            return callback(null, false);
        }

        this.log(`${this.name} speaker muted: %s`, mute ? "Yes" : "No");

        callback(null, !mute);
    });
}

SamsungMultiroomAccessory.prototype.setMuteState = function(state, callback) {
    sm.setMute(!state, (error, mute) => {
        if(error){
            this.log(`${this.name} speaker couldn't set mute state.`);
            return callback(null, false);
        }

        this.log(`${this.name} speaker muted: %s`, !state ? "Yes" : "No");
        callback(null, true);
    });
}

SamsungMultiroomAccessory.prototype.getVolume = function(callback) {
    sm.getVolume( (error, volume) => {
        if(error){
            this.log(`${this.name} speaker couldn't return volume.`);
            return callback(null, false);
        }

        this.log(`${this.name} speaker volume: ${volume}`);
        callback(null, parseInt(volume));
    });
}

SamsungMultiroomAccessory.prototype.setVolume = function(level, callback) {
    sm.setVolume(level, (error, mute) => {
        if(error){
            this.log(`${this.name} speaker couldn't set volume to ${level}.`);
            return callback(null, false);
        }

        this.log(`${this.name} speaker set volume to ${level}.`);
        callback(null, true);
    });
}

SamsungMultiroomAccessory.prototype.getServices = function() {
    return [this.volumeService];
}