App.info({
  id: 'org.singularities.songspot',
  name: 'Song Pot',
  version: "0.0.5"
});

App.icons({
  'android_mdpi': 'icons/icon-48.png', // (48x48)
  'android_hdpi':   'icons/icon-72.png', // (72x72)
  'android_xhdpi':  'icons/icon-96.png', // (96x96)
  'android_xxhdpi': 'icons/icon-144.png', // (144x144)
  'android_xxxhdpi': 'icons/icon-192.png' // (192x192)
});

App.launchScreens({
//  'android_mdpi_portrait': 'splash/android-mdpi.png', // (320x470)
//  'android_hdpi_portrait': 'splash/android-hdpi.png', // (480x640)
  'android_xhdpi_portrait': 'splash/android-xhdpi.9.png' // (720x960)
//  'android_xxhdpi_portrait': 'splash/android-xxhdpi.png' // (1080x1440)
});

App.accessRule('https://discourse.songpot.rocks/', { type: 'intent' });
App.accessRule('http://singularities.org/atd', { type: 'intent' });
App.accessRule('https://atd.singularities.org/', { type: 'intent' });
App.accessRule('http://ruidodebarrio.lapiluka.org/', { type: 'intent' });
App.accessRule('https://github.com/singularities/song-pot', { type: 'intent' });
