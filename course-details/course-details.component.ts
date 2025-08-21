import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../../model/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  courses: Course[] = [];

  @Output() editCourse = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    const data = localStorage.getItem('courses');
    this.courses = data ? JSON.parse(data) : [];
  }

  onEdit(id: string): void {
    this.editCourse.emit(id);
  }

  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete?')) {
      this.courses = this.courses.filter((c) => c.id !== id);
      localStorage.setItem('courses', JSON.stringify(this.courses));
    }
  }
}
