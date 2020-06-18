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
    is_address_found: boolean;
    is_eigentuemer_found: boolean;
    is_eigentuemer_edited: boolean;
    email: string;
    area_name: string;
    area_polyline: Coordinate[];
    anlegungen: string[];
    anlegungen_: Anlegung[];
    area_in_m2: number;
    base64_jpeg_image: string;
    is_historized: boolean;
    gdename: string;
    gdekt: string;
    gdenr: number;
    center_coordinate: number[];
    last_map_center: number[];
    egrid: string;
    grundbuch_nummer: number;
    strname1: string;
    plzname: string;
    plz4: string;
}
