import { DashboardComponent } from './../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../model/course.model';
import { Router } from '@angular/router';

interface Department {
  id: string;
}

@Component({
  selector: 'app-course-filter',
  standalone: true,
  imports: [DashboardComponent,CommonModule, FormsModule],
  templateUrl: './course-filter.component.html',
  styleUrl: './course-filter.component.css',
})
export class CourseFilterComponent implements OnInit {
  selectedCourse: string = '';
  courses: Course[] = [];

  departmentList: Department[] = [
    { id: 'Computer Science' },
    { id: 'Electronics' },
    { id: 'Mechanical' },
    { id: 'Civil' },
    { id: 'Artificial Intelligence and Data Science' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const coursesData = localStorage.getItem('courses');
    if (coursesData) {
      this.courses = JSON.parse(coursesData);
    }
  }

  getDepartmentName(id: string): string {
    const dept = this.departmentList.find((d) => d.id === id);
    return dept ? dept.id : id;
  }

  filteredCourse(): Course[] {
    return this.courses.filter((course) => {
      return this.selectedCourse ? course.deptid === this.selectedCourse : true;
    });
  }
}
