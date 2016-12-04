import angular from 'angular';

class AudioObject {
  constructor ($interval) {

    this.$interval = $interval;
  }

  get paused () {
    return this.object.paused;
  }

  get duration () {
    return this.object.duration;
  }

  get currentTime () {
    if (this.object.currentTime) {
      return Math.round(this.object.currentTime);
    } else {
      return 0;
    }
  }

  set currentTime (t) {
    this.object.currentTime = t;
  }

  load (url) {
    if (! this.object) {
      this.object = new Audio();
    }

    this.object.src = url;

    this.object.onended = () => {
      if (this.interval) {
        this.$interval.cancel(this.interval);
      }
    };

    return this;
  }

  play () {
    // Set periodic interval so md-slider checks the currentTime

    this.interval = this.$interval(function () {console.log('interval');}, 1000);

    this.object.play();
  }

  pause () {
    this.$interval.cancel(this.interval);

    this.object.pause();
  }
}

AudioObject.$inject = [ '$interval' ];

// Goal: turn `AudioObject` factory into
// ['$interval', ($interval) => new AudioObject($inverval)]
// From http://www.michaelbromley.co.uk/blog/350/exploring-es6-classes-in-angularjs-1-x#_section-factories

var constructorFn = AudioObject;

var args = constructorFn.$inject; // args = ['$interval']
var factoryFunction = (...args) => {
    return new constructorFn(...args);
};
args.push(factoryFunction); // args = ['$interval', factoryFunction]


const name = "audioObject";

export default angular.module(name, [
])
  .factory(name, args);
