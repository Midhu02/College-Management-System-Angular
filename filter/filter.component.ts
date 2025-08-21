import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Student } from '../../model/student.model';

interface Department {
  id: string;
}

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardComponent],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  selectedDepartmentId: string = '';
  students: Student[] = [];

  departmentList: Department[] = [
    { id: 'Computer Science' },
    { id: 'Electronics' },
    { id: 'Mechanical' },
    { id: 'Civil' },
    { id: 'Artificial Intelligence and Data Science' },
  ];

  ngOnInit(): void {
    const studentsData = localStorage.getItem('students');
    this.students = studentsData ? JSON.parse(studentsData) : [];
  }

  getDepartmentName(departmentId: string): string {
    const dept = this.departmentList.find((d) => d.id === departmentId);
    return dept ? dept.id : departmentId;
  }

  filteredStudents(): Student[] {
    return this.selectedDepartmentId
      ? this.students.filter(
          (emp) => emp.departmentId === this.selectedDepartmentId
        )
      : this.students;
  }
}
