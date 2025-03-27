import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feature-card">
      <div class="feature-icon">{{ feature.icon }}</div>
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.description }}</p>
      <a href="#" class="learn-more">Learn more</a>
    </div>
  `,
  styles: [`
    .feature-card {
      text-align: center;
      padding: 20px;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .feature-icon {
      font-size: 2rem;
      margin-bottom: 10px;
      color: #6b46c1;
    }
    .learn-more {
      color: #6b46c1;
      text-decoration: none;
      font-weight: bold;
    }
  `]
})
export class FeatureSectionComponent {
  @Input() feature: any;
}
