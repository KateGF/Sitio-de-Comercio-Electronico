import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit {
  user: any = {};
  editMode = false;
  activeTab: string = 'details'; // 'details' or 'history'

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe(data => {
      this.user = data;
    });
  }

  saveProfile(): void {
    this.userService.updateProfile(this.user).subscribe(updated => {
      this.user = updated;
      this.editMode = false;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  deleteAccount(): void {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      this.userService.deleteAccount().subscribe({
        next: () => {
          // Successfully deleted account
          this.authService.logout();
          alert('Your account has been deleted.');
          this.router.navigate(['/']);
        },
        error: () => {
          alert('There was an error deleting your account. Please try again.');
        }
      });
    }
  }
}
