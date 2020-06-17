export class Coordinate {
    coord: number[];
}

export class Anlegung {
    label: string;
    id: string;
    description: string;
    is_selected: boolean;
    image_names:  string[];
    product_options: string[];
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
    anlegungen_: Anlegung[];
    area_in_m2: number;
    base64_jpeg_image: string;
    is_historized: boolean;
}
