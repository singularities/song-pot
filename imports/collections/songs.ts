import { MongoObservable } from 'meteor-rxjs';
import { Song } from '../models';

export const Songs = new MongoObservable.Collection<any>('songs');
