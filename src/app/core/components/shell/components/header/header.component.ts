import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation.service';
import { Link } from 'src/app/shared/models/link.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  links?: Link[];

  constructor(
    private route: Router,
    private navigationService: NavigationService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllLinks();
  }

  logoutUser(): void {
    localStorage.removeItem('User');
    localStorage.removeItem('Role');
    this.route.navigateByUrl('/login');

    this._snackBar.open('Bye!', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  private getAllLinks(): void {
    this.navigationService
      .getAll()
      .pipe(take(1))
      .subscribe((links) => (this.links = links));
  }
}
