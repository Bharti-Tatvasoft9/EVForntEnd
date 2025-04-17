import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChargingSimulatorComponent } from './charging-simulator/charging-simulator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , ChargingSimulatorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EVFrontend';
}
