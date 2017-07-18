import { Injectable } from '@angular/core';
import { Legislator } from './legislator.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class LegislatorService {
  legislators: FirebaseListObservable<any[]>;

  constructor(private af: AngularFireDatabase) {
    this.legislators = af.list('legislators');
  }
  addLegislator(newLegislator: Legislator) {
    this.legislators.push(newLegislator);
  }
}
