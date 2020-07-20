import { Item } from './item';
export class GalleryResponse {
  title: string;
  link: string;
  description: string;
  modified: Date;
  generator: string;
  items: Item[];
}