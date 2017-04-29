import { MongoObservable } from 'meteor-rxjs';
import { Band } from '../models';

export const Bands = new MongoObservable.Collection<Band>('bands');
