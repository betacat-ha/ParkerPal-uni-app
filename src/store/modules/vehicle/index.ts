import { defineStore } from 'pinia';
import type { VehicleState } from './types';
import type { VehicleData } from '@/api/vehicle/types';
import { getVehicleInfo, submitVehicleData } from '@/api/vehicle';

export const useVehicleStore = defineStore('vehicle', {
  state: (): VehicleState => ({
    id: '',
    licensePlate: '',
    powerType: 'oil',
    vehicleType: 'pickup',
    etcInfo: 'yes',
    model: '',
  }),
  getters: {
  },
  actions: {
    setVehicleData(partial: Partial<VehicleData>) {
      this.$patch(partial);
    },

    async fetchVehicleInfo() {
      getVehicleInfo().then((result) => {
        this.setVehicleData(result);
      },
      );
    },

    async submitVehicleData() {
      await submitVehicleData(this as VehicleData);
      this.fetchVehicleInfo();
    },
  },
});
