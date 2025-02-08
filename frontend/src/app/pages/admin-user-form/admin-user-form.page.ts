import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-form.page.html',
  styleUrls: ['./admin-user-form.page.css']
})
export class AdminUserFormPage implements OnInit {
  user: any = {
    username: '',
    email: '',
    password: '',
    role: 'user'
  };
  isEditMode: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userService.getAllUsers().subscribe(users => {
        const found = users.find(u => u._id === id);
        if (found) {
          this.user = found;
        }
      });
    }
  }

  saveUser(): void {
    if (this.isEditMode) {
      this.userService.updateUserByAdmin(this.user._id, this.user).subscribe(() => {
        alert('User updated successfully.');
        this.router.navigate(['/admin-users']);
      });
    } else {
      this.userService.addUserByAdmin(this.user).subscribe(() => {
        alert('User created successfully.');
        this.router.navigate(['/admin-users']);
      });
    }
  }
}
