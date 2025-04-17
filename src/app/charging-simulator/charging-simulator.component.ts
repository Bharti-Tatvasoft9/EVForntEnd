import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Machine, MachineService, Station } from '../MachineService';

@Component({
  selector: 'app-charging-simulator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FormsModule],
  templateUrl: './charging-simulator.component.html',
  styleUrls: ['./charging-simulator.component.scss'],
})
export class ChargingSimulatorComponent {
  machines: Machine[] = [];
  selectedMachineId: number | null = null;
  stationForm: FormGroup;
  machineForm: FormGroup;

  stations: Station[] = [];
  constructor(
    private machineService: MachineService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.stationForm = this.fb.group({
      stationName: [''],
      address: [''],
      contactNumber: [''],
      email: [''],
    });
    this.machineForm = this.fb.group({
      machineName: [''],
      stationId: [''],
    });

    this.loadStations();
  }

  ngOnInit(): void {
    this.getMachines();
    this.loadStations();
  }
  
  getMachines() {
    this.machineService.getMachines().subscribe((data) => {
      this.machines = data;
      console.log('Machines:', this.machines);
      if (data.length > 0) this.selectedMachineId = data[0].machineid;
    });
  }

  loadStations() {
    this.machineService.getStations().subscribe((data) => {
      this.stations = data;
      console.log('Stations:', this.stations);
    });
  }

  saveStation() {
    if (this.stationForm.invalid) return;

    this.machineService.saveStation(this.stationForm.value).subscribe({
      next: () => {
        alert('Station saved successfully!');
        this.stationForm.reset();
        this.loadStations();
      },
      error: (err) => {
        console.error(err);
        alert('Error saving station');
      }
    });
  }

  saveMachine() {
    if (this.machineForm.invalid) return;

    this.machineService.saveMachine(this.machineForm.value).subscribe({
      next: () => {
        alert('Machine saved successfully!');
        this.machineForm.reset();
        this.getMachines();
      },
      error: (err) => {
        console.error(err);
        alert('Error saving machine');
      }
    });
  }
  startCharging() {
    if (this.selectedMachineId) {
      this.machineService
        .simulateCharging({
          machineId: this.selectedMachineId,
          status: 'Start',
          timestamp: this.getUTCFromLocal(),
        })
        .subscribe({
          next: (res) => {
            alert('Charging started ✅');
          },
          error: (err) => {
            alert('Failed to start charging ❌');
          },
        });
    }
  }

  stopCharging() {
    if (this.selectedMachineId) {
      this.machineService
        .simulateCharging({
          machineId: this.selectedMachineId,
          status: 'Stop',
          timestamp: this.getUTCFromLocal(),
        })
        .subscribe({
          next: () => alert('Charging stopped ⛔'),
          error: () => alert('Failed to stop charging ❌'),
        });
    }
  }
  getUTCFromLocal(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  }
}
