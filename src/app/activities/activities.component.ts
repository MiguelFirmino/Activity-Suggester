import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from '../services/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activityType: string = '';
  activityDescription: string = '';
  activityParticipants: number = 0;
  activityPrice: string = '';
  activityLink: string | undefined;
  
  constructor(private route: ActivatedRoute, private activitiesService: ActivitiesService) { 
    route.params.subscribe((params) => {
      this.activityType = params['type'];
    })
  }

  ngOnInit() {
    this.requestActivity();
  }

  requestActivity = () => {
    this.activitiesService.getActivityOfType(this.activityType).subscribe((data) => {
      this.activityDescription = data.activity;
      this.activityParticipants = data.participants;

      let price = data.price;
      if (price == 0) {
        this.activityPrice = "Free";
      } else if (price >= 0.05 && price < 0.1) {
        this.activityPrice = "Very Cheap";
      } else if (price >= 0.1 && price < 0.2) {
        this.activityPrice = "Cheap";
      } else if (price >= 0.2 && price < 0.4) {
        this.activityPrice = "Medium";
      } else if (price >= 0.4 && price < 0.5) {
        this.activityPrice = "Relatively Expensive";
      } else {
        this.activityPrice = "Expensive";
      }

      this.activityLink = data.link;
    })
  }
}
