import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.css']
})
export class AdminDashboardPage implements OnInit {
  // For logistics stats
  bestSellers: any[] = [];
  usersPerDay: any[] = [];
  ordersPerDay: any[] = [];

  // For orders
  orders: any[] = [];
  
  // Tabs for main page
  activeTab: string = 'logistics'; // 'logistics' or 'orders'

  // Sub-tab for orders by status
  ordersActiveStatus: string = 'pending'; // 'pending', 'in preparation', 'shipped', 'delivered', 'denied'

  constructor(
    private adminService: AdminService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadOrders();
  }

  // Load the "logistics" stats: best sellers, user registrations, orders per day
  loadStatistics(): void {
    this.adminService.getDashboardStats().subscribe(data => {
      this.bestSellers = data.bestSellers;
      this.usersPerDay = data.loggedInUsersPerDay;
      this.ordersPerDay = data.ordersPerDay;
    });
  }

  // Load all orders for admin/logistics
  loadOrders(): void {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  setOrdersActiveStatus(status: string): void {
    this.ordersActiveStatus = status;
  }

  // Filtered orders by status
  get filteredOrders(): any[] {
    return this.orders.filter(o => o.status === this.ordersActiveStatus);
  }

  // Accept/deny logic
  acceptOrder(orderId: string): void {
    let newStatus = '';
    switch (this.ordersActiveStatus) {
      case 'pending':
        newStatus = 'in preparation';
        break;
      case 'in preparation':
        newStatus = 'shipped';
        break;
      case 'shipped':
        newStatus = 'delivered';
        break;
      default:
        newStatus = ''; 
        break;
    }
    if (!newStatus) return;
    
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(() => {
      this.loadOrders();
    });
  }

  denyOrder(orderId: string): void {
    this.orderService.updateOrderStatus(orderId, 'denied').subscribe(() => {
      this.loadOrders();
    });
  }
}
