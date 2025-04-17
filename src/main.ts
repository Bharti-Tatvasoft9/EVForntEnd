import { bootstrapApplication } from '@angular/platform-browser';
import { ChargingSimulatorComponent } from './app/charging-simulator/charging-simulator.component';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
});
