import type { IconType } from "react-icons";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { FaLock, FaParking, FaTree, FaTv, FaUmbrellaBeach, FaWifi } from "react-icons/fa";
import { FaCheck, FaKitchenSet } from "react-icons/fa6";
import { GiTowel } from "react-icons/gi";
import {
  MdBalcony,
  MdElevator,
  MdLaptopMac,
  MdLocalLaundryService,
  MdMicrowave,
  MdOutlineCleaningServices,
  MdPool,
  MdSanitizer,
  MdSecurity,
  MdWaves,
} from "react-icons/md";
import { TbAirConditioning } from "react-icons/tb";

export interface Amenity {
  key: string;
  label: string;
  icon: IconType;
}

/** Every amenity the admin panel offers, in display order. */
export const AMENITIES: Amenity[] = [
  { key: "air_conditioning", label: "Air Conditioning", icon: TbAirConditioning },
  { key: "free_parking", label: "Free Parking", icon: FaParking },
  { key: "wifi", label: "WiFi", icon: FaWifi },
  { key: "smart_tv", label: "Smart TV", icon: FaTv },
  { key: "weekly_cleaning", label: "Weekly Cleaning", icon: MdOutlineCleaningServices },
  { key: "linens_towels", label: "Linens and Towels", icon: GiTowel },
  { key: "smart_lock", label: "Smart Lock", icon: FaLock },
  { key: "refrigerator", label: "Refrigerator", icon: CgSmartHomeRefrigerator },
  { key: "kitchen", label: "Kitchen", icon: FaKitchenSet },
  { key: "microwave", label: "Microwave", icon: MdMicrowave },
  { key: "toiletries", label: "Toiletries", icon: MdSanitizer },
  { key: "pool", label: "Swimming Pool", icon: MdPool },
  { key: "sea_view", label: "Sea View", icon: MdWaves },
  { key: "garden_view", label: "Garden View", icon: FaTree },
  { key: "balcony", label: "Balcony", icon: MdBalcony },
  { key: "washer", label: "Washing Machine", icon: MdLocalLaundryService },
  { key: "elevator", label: "Elevator", icon: MdElevator },
  { key: "security", label: "24/7 Security", icon: MdSecurity },
  { key: "workspace", label: "Dedicated Workspace", icon: MdLaptopMac },
  { key: "beach_access", label: "Beach Access", icon: FaUmbrellaBeach },
];

const BY_KEY = new Map(AMENITIES.map((amenity) => [amenity.key, amenity]));

/** Looks up an amenity, falling back to a readable label for unknown keys. */
export function getAmenity(key: string): Amenity {
  return (
    BY_KEY.get(key) ?? {
      key,
      label: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      icon: FaCheck,
    }
  );
}
