import angular from 'angular';
import angularMeteor from 'angular-meteor';
import songList from '../imports/components/songs/songList';

angular.module('songlog', [
  angularMeteor,
  songList.name
]);
