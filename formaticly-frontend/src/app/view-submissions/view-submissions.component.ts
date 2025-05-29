import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';

// Orval-generated client import
import { getSubmissionsSubmissionsGet, GetSubmissionsSubmissionsGetResult } from '../api/feedback.api'; // adjust the path based on your actual output

@Component({
  selector: 'app-view-submissions',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.css'],
})
export class ViewSubmissionsComponent implements OnInit {
  submissions: any[] = [];
  loading = false;
  error = '';

  ngOnInit() {
    this.loadSubmissions();
  }

  async loadSubmissions() {
    this.loading = true;
    this.error = '';

    try {
      const { data } = await getSubmissionsSubmissionsGet(); // Orval handles typing
      this.submissions = data;
      console.log(this.submissions);

    } catch (err) {
      this.error = 'Failed to load submissions.';
    } finally {
      this.loading = false;
    }
  }

  timeAgo(dateString: string | undefined): string {
    console.log('timeAgo called with:', dateString);
    if (!dateString) return 'Unknown time';

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Unknown time';

    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  }




  truncateMessage(msg: string, length = 50) {
    return msg.length <= length ? msg : msg.slice(0, length) + '...';
  }
}
