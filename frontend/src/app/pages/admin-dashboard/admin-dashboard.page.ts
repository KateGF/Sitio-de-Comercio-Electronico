import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.css']
})
export class AdminDashboardPage implements OnInit {
  bestSellers: any[] = [];
  usersPerDay: any[] = [];
  ordersPerDay: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe(data => {
      this.bestSellers = data.bestSellers;
      this.usersPerDay = data.loggedInUsersPerDay;
      this.ordersPerDay = data.ordersPerDay;
    });
  }
}
