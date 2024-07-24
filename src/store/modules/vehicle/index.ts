import { defineStore } from 'pinia';
import type { VehicleData } from '@/api/vehicle/types';
import { getVehicleInfo, submitVehicleData } from '@/api/vehicle';

interface VehicleState {
  vehicleData: VehicleData | null
  isLoading: boolean
  error: string | null
}

export const useVehicleStore = defineStore('vehicle', {
  state: (): VehicleState => ({
    vehicleData: null,
    isLoading: false,
    error: null,
  }),
  getters: {
    vehicleInfo(state) {
      return state.vehicleData;
    },
  },
  actions: {
    setVehicleData(partial: Partial<VehicleData>) {
      this.vehicleData = { ...this.vehicleData, ...partial };
    },

    async fetchVehicleInfo(licensePlate: string) {
      try {
        this.isLoading = true;
        const result = await getVehicleInfo(licensePlate);
        this.setVehicleData(result);
        this.isLoading = false;
        this.error = null;
      }
      catch (error) {
        this.isLoading = false;
        this.error = error instanceof Error ? error.message : '未知错误';
      }
    },

    async submitVehicleData() {
      try {
        this.isLoading = true;
        const result = await submitVehicleData(this.vehicleData as VehicleData);
        this.setVehicleData(result);
        this.isLoading = false;
        this.error = null;
      }
      catch (error) {
        this.isLoading = false;
        this.error = error instanceof Error ? error.message : '未知错误';
      }
    },
  },
});
