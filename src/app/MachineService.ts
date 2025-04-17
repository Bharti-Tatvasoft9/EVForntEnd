import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MachineService {
  private baseUrl = 'https://evbackend-8wjt.onrender.com';

  constructor(private http: HttpClient) {}

  getMachines(): Observable<Machine[]> {
    return this.http.get<Machine[]>(`${this.baseUrl}/api/Machine/evmachines`);
  }

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(`${this.baseUrl}/api/Machine/stations`);
  }

  saveMachine(machine:InsertMachine): Observable<Machine>{
    return this.http.post<Machine>(`${this.baseUrl}/api/Machine/savemachine`, machine);
  }

  saveStation(station:Station) : Observable<Station>{
    return this.http.post<Station>(`${this.baseUrl}/api/Machine/saveStation`, station);
  }

  simulateCharging(request: EventPayload): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/api/Event/send`,
      request
    );
  }
}

export interface Machine {
  machineid: number;
  machinename: string;
}

export interface Station {
  stationid: number;
  stationname: string;
  address: string;
  contactnumber: string;
  email: string;
}

export interface InsertMachine {
  MachineName: string;
  stationId: number;
}

export interface EventPayload {
  machineId: number;
  status: string;
  timestamp?: string;
}
