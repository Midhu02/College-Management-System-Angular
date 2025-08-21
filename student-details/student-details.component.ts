import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../model/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent implements OnInit {
  students: Student[] = [];

  @Output() editStudent = new EventEmitter<string>();

  isListPage = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    const data = localStorage.getItem('students');
    this.students = data ? JSON.parse(data) : [];
  }

  onEdit(id: string): void {
    this.editStudent.emit(id);
    localStorage.setItem('students', JSON.stringify(this.students));
  }

  onDelete(studentId: string): void {
    if (confirm('Are you sure you want to delete?')) {
      this.students = this.students.filter((s) => s.id !== studentId);
      localStorage.setItem('students', JSON.stringify(this.students));
    }
  }
}
