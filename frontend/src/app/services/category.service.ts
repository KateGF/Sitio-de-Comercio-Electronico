import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories = [
    {
      name: 'Computadoras',
      subcategories: [
        {
          name: 'Laptops',
          subcategories: [
            { name: 'Gaming' },
            { name: 'Ultrabooks' },
            { name: '2 en 1' },
          ],
        },
        {
          name: 'Escritorio',
          subcategories: [
            { name: 'Workstation' },
            { name: 'Gaming' },
          ],
        },
      ],
    },
    {
      name: 'Componentes',
      subcategories: [
        {
          name: 'Tarjetas de Video',
          subcategories: [
            { name: 'NVIDIA' },
            { name: 'AMD' },
          ],
        },
        {
          name: 'Procesadores',
          subcategories: [
            { name: 'Intel' },
            { name: 'AMD' },
          ],
        },
      ],
    },
    {
      name: 'Accesorios',
      subcategories: [
        {
          name: 'Mouse',
          subcategories: [
            { name: 'Inalámbricos' },
            { name: 'Cableados' },
          ],
        },
      ],
    },
  ];

  constructor() {}

  getCategories() {
    return this.categories;
  }
}
