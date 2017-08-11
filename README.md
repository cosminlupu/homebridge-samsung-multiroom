homebridge-samsung-multiroom
====
_by @cosminlupu_

> A homebridge plugin that using [samsung-multiroom](https://github.com/cosminlupu/samsung-multiroom) allows you to control your Samsung Multiroom (R1, R2, R3) speakers. The speaker should be controlled completely from the native HomeKit iOS app and Siri, that is why volume appears as a light bulb for now, until homekit will support speakers.

_Tested only with a Samsung R1 speaker_

* **GitHub:** <https://github.com/cosminlupu/homebridge-samsung-multiroom>

## Current features
* Get mute status
* Set mute
* Get volume
* Set volume

## How to use
If you are new to Homebridge, please first read the Homebridge [documentation](https://www.npmjs.com/package/homebridge).
If you are running on a Raspberry, you will find a tutorial in the [homebridge-punt Wiki](https://github.com/cflurin/homebridge-punt/wiki/Running-Homebridge-on-a-Raspberry-Pi).

Install homebridge:
```sh
sudo npm install -g homebridge
```

Install homebridge-webos3:
```sh
sudo npm install -g homebridge-webos3
```

## Configuration

Add the accessory in `config.json` in your home directory inside `.homebridge`.

```js
{
  "accessories": [
    {
      "accessory": "SamsungMultiroom",
      "name": "Speaker",
      "host": "192.168.0.40",
      "port": "55001"
    }
  ]
}
```

## License
MIT