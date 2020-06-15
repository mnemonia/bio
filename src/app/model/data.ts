export class Coordinate {
    coord: number[];
}
export class Data {
    id: string;
    surname: string;
    lastname: string;
    address_canonical: string;
    email: string;
    area_name: string;
    area_polyline: Coordinate[];
    anlegungen: string[];
    area_in_m2: number;
    base64_jpeg_image: string;
    is_historized: boolean;
}
