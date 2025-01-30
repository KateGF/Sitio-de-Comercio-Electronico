import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router } from '@angular/router';import { FormsModule } from "@angular/forms"
import { Inject } from "@angular/core"
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email = ""
  password = ""
  isLoading = false
  error = ""

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      this.error = "Please fill in all fields"
      return
    }

    this.isLoading = true
    this.error = ""

    try {
      await this.authService.login(this.email, this.password)
      // Navigate to home or previous page
    } catch (err) {
      this.error = "Invalid email or password"
    } finally {
      this.isLoading = false
    }
  }
}

