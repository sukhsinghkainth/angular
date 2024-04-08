import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { Icategory } from 'src/app/datatypes/dataTypes';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(
    private http: HttpService) { }
  createCategory(categoryData: Icategory) {
    return this.http.post<Icategory>("createCategory", categoryData);
  }
  deleteCategory(name: string) {
    return this.http.delete<Icategory>(`deleteCategory/${name}`)
  }
  getCategory(categoryType?: string) {
    let query = `${"allcategories"}`
    if (categoryType) {
      query = `allcategories/${categoryType}`
    }
    return this.http.get<Icategory[]>(query);
  }
  editCategory(name: string, categoryData: string) {
    return this.http.update(`editCategory/${name}`, categoryData)
  }
}
