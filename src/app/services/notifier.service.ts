import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  static showAllertNotification(message: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private snackBar: MatSnackBar) { }

  showAllertNotification(message: string){
    this.snackBar.open(message,'Fechar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  showSuccesNotification(message: string){
    this.snackBar.open(message, undefined, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

}
