import { PropertyTypeEnum } from "./enums/PropertyTypeEnum";

export interface PropertyListing {
  propertyId: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqFt: number;
  description?: string;
  address: string;
  listingDate: Date;
  propertyType: PropertyTypeEnum;
  imageUrl?: string;
}
