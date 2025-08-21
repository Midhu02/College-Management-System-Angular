import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './department-details.component.html',
  styleUrl: './department-details.component.css',
})
export class DepartmentDetailsComponent implements OnInit {
  departments: any[] = [];

  constructor(private router: Router) {}

  isListPage = true;

  @Output() editDepartment = new EventEmitter<string>();

  ngOnInit(): void {
    this.loadDepartment();
  }

  loadDepartment() {
    const data = localStorage.getItem('departments');
    this.departments = data ? JSON.parse(data) : [];
  }

  onEditdept(id: string) {
    this.editDepartment.emit(id);
    // Optional: remove this if you're not modifying departments here
    localStorage.setItem('departments', JSON.stringify(this.departments));
  }

  onDelete(id: string) {
    const departments = JSON.parse(localStorage.getItem('departments') || '[]');
    const students = JSON.parse(localStorage.getItem('students') || '[]');

    const departmentToDelete = departments.find((d: any) => d.id === id);
    const deptName = departmentToDelete?.deptname;

    const isAssigned = students.some((s: any) => s.departmentId === deptName);

    if (isAssigned) {
      alert(
        `Cannot delete the "${deptName}" department because students are assigned to it.`
      );
      return;
    }

    if (confirm('Are you sure you want to delete this department?')) {
      const updatedDepartments = departments.filter((d: any) => d.id !== id);
      localStorage.setItem('departments', JSON.stringify(updatedDepartments));
      this.loadDepartment();
      alert('Department deleted successfully!');
    }
  }
}
