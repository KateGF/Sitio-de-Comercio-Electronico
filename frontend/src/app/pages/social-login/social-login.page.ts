import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-login.page.html',
  styleUrls: ['./social-login.page.css']
})
export class SocialLoginPage implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        // Save the token in localStorage (or pass it to your AuthService)
        localStorage.setItem('token', token);
        // Optionally, update your AuthService's currentUser$ observable here.
        // Redirect to the home page.
        this.router.navigate(['/']);
      } else {
        // If no token, redirect to login.
        this.router.navigate(['/login']);
      }
    });
  }
}
