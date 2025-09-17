import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-team-page',
  imports: [],
  templateUrl: './my-team-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyTeamPageComponent {}
