import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  saveInfromation(category, data) {
    this.firestore
      .collection(category)
      .add(data)
      .then((ref) => {
        this.toastr.success('Hoooray New Information saved successfully');
      })
      .catch((error) => {
        this.toastr.error(error);
      });
  }

  loadInformation() {
    return this.firestore
      .collection('Marketing')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, data };
          });
        })
      );
  }

  deleteCategory(category: string, id: string) {
    this.firestore
      .doc(`${category}/${id}`)
      .delete()
      .then(() => {
        this.toastr.error(' Information succesfully deleted');
      });
  }
}
