import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.page.html',
  styleUrls: ['./admin-users.page.css']
})
export class AdminUsersPage implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  editUser(userId: string): void {
    this.router.navigate(['/admin-user-form'], { queryParams: { id: userId } });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUserByAdmin(userId).subscribe(() => {
        alert('User deleted successfully.');
        this.loadUsers();
      });
    }
  }

  createUser(): void {
    this.router.navigate(['/admin-user-form']);
  }
}
