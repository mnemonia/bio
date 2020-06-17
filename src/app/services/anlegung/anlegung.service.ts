import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Anlegung} from '../../model/data';

@Injectable({
  providedIn: 'root'
})
export class AnlegungService {

  constructor() { }

  public findAll(): Observable<Anlegung[]> {
    const anlegungen = [];
    let a = new Anlegung();
    a.id = '070';
    a.label = 'Blumenwiese';
    a.description = 'Rasenmähen ist nicht nur anstrengend und zeitraubend, für die Biodiversität ist ein gepflegter Rasen auch eher wertlos. Wie wäre es stattdessen mit einer bunten Blumenwiese, auf der Schmetterlinge und Wildbienen ihre Nahrung finden?';
    a.is_selected = false;
    a.image_names = ['070_1.jpg', '070_2.jpg', '070_3.jpg'];
    a.product_options = ['Samenmischung, 50 Arten (HoloSem® Alpennordflanke, ausgebürstet aus alten Wiesen)'];
    anlegungen.push(a);
    a = new Anlegung();
    a.id = '010';
    a.label = 'Hecken, Ufer- oder Feldgehölz';
    a.description = 'Hecken, Feld- und Ufergehölze strukturieren die Landschaft und vereinfachen als Korridor oder Biotopverbindung die Mobilität der Arten.<br>\n' +
        'Hecken sind aus verschiedenen einheimischen dornen- oder früchtetragenden Sträuchern, alten hohlen Bäumen und Totholz zusammengesetzt und bieten vielen Tieren Nahrung und Unterschlupf.<br>\n' +
        'Als Schattenspender für Weidetiere sowie Wind- und Erosionsschutz sind sie sowohl wichtig für den Schutz der Ressourcen (Boden, Wasser Luft) wie auch von grosser Bedeutung für die Landwirtschaft.';
    a.is_selected = false;
    a.image_names = ['010_1.jpg', '010_2.jpg', '010_3.jpg'];
    a.product_options = [];
    anlegungen.push(a);
    a = new Anlegung();
    a.id = '020';
    a.label = 'Wassergraben, Teich und Tümpel';
    a.description = 'Es handelt sich um offene Wasserflächen und mehrheitlich unter Wasser stehende Flächen, die ' +
        'zur Betriebsfläche gehören.<br>' +
        'Diese kleinen Wasserflächen beherbergen eine spezialisierte Flora und werden von einer grossen ' +
        'Anzahl Tiere als Lebensraum (kleine Krebstiere, aquatische Insekten), für die Fortpflanzung ' +
        '(Amphibien, Libellen) oder als Tränke (Vögel, Schmetterlinge, Bienen) genutzt.<br>' +
        'Ausserdem werden austrocknende Tümpel gerne von Schwalben aufgesucht, die hier Lehm für ' +
        'den Nestbau finden';
    a.is_selected = false;
    a.image_names = ['070_1.jpg', '070_2.jpg', '070_3.jpg'];
    a.product_options = [];
    a.product_options.push('Echtes Pfeilkraut (Sagittaria sagittifolia)');
    a.product_options.push('Bitteres Schaumkraut (Cardamine amara)');
    a.product_options.push('Grosser Sumpf-Hahnenfuss (Ranunculus lingua)');
    a.product_options.push('Wolfsfuss (Lycopus europaeus)');
    a.product_options.push('Kleiner Merk (Berula erecta)');
    a.product_options.push('Wasser-Minze (Mentha aquatica)');
    a.product_options.push('Sumpf-Helmkraut (Scutellaria galericulata)');
    a.product_options.push('Bachbungen-Ehrenpreis (Veronica beccabunga)');
    a.product_options.push('Sumpf-Dotterblume (Caltha palustris)');
    a.product_options.push('Sumpf-Baldrian (Valeriana dioica)');
    a.product_options.push('Wechselblättriges Milzkraut (Chrysosplenium alternifolium)');
    a.product_options.push('Glieder-Binse (Juncus articulatus)');
    a.product_options.push('Waldbinse (Scirpus sylvaticus)');
    a.product_options.push('Steife Segge (Carex elata)');
    a.product_options.push('Gemeiner Froschlöffel (Alisma plantago-aquatica');
    anlegungen.push(a);
    a = new Anlegung();
    a.id = '030';
    a.label = 'Ruderalfläche, Stein- oder Asthaufen';
    a.description = 'Ruderalflächen sind Aufschüttungen, Schutthaufen und Böschungen, die mit krautigen Arten\n' +
        'bewachsen sind.<br><br>Stein- und Asthaufen sind besonders wertvoll für Reptilien und Kleintiere.';
    a.is_selected = false;
    a.image_names = ['070_1.jpg', '070_2.jpg', '070_3.jpg'];
    a.product_options = [];
    a.product_options.push('Grosse Brennnessel (Urtica dioica)');
    a.product_options.push('Dunkle Königskerze (Verbascum nigrum)');
    a.product_options.push('Wiesen-Kerbel (Anthriscus sylvestris)');
    a.product_options.push('Kleinblütige Königskerze (Verbascum thapsus)');
    a.product_options.push('Rainfarn (Tanacetum vulgare)');
    a.product_options.push('Weisser Steinklee (Melilotus albus)');
    a.product_options.push('Wegwarte (Cichorium intybus)');
    a.product_options.push('Echte Kamille (Matricaria chamomilla)');
    a.product_options.push('Herbst-Milchkraut (Leontodon autumnalis)');
    a.product_options.push('Pastinak (Pastinaca sativa)');
    a.product_options.push('Wiesen-Margerite (Leucanthemum vulgare)');
    a.product_options.push('Klatschnelke (Silene vulgaris)');
    a.product_options.push('Wilde Malve (Malva sylvestris)');
    a.product_options.push('Grosse Klette (Arctium lappa)');
    a.product_options.push('Echter Steinklee (Melilotus officinalis)');
    a.product_options.push('Spanischer Mauerpfeffer (Sedum hispanicum)');
    a.product_options.push('Huflattich (Tussilago farfara)');
    a.product_options.push('Knoblauchhederich (Alliaria petiolata)');
    a.product_options.push('Gemeiner Beifuss (Artemisia vulgaris)');
    a.product_options.push('Sigmarswurz (Malva alce)');
    a.product_options.push('Wilde Karde (Dipsacus fullon)');
    anlegungen.push(a);
    a = new Anlegung();
    a.id = '040';
    a.label = 'extensive Wiese mit regionalem Saatgut';
    a.description = 'Viele Artengruppen wie Heuschrecken oder Tagfalter haben ihre\n' +
        'weitaus grösste Artenvielfalt im Wiesland. Bei der Aufwertung von Wiesen durch\n' +
        'Neuansaaten, ist es für die Erhaltung der Biodiversität zentral, dass die in\n' +
        'der Umgebung vorhandenen Pflanzenarten und -ökotypen verwendet werden.\n' +
        'Diese Anforderung kann durch regionales Saatgut, das aus Direktbegrünung\n' +
        'stammt, erfüllt werden.';
    a.is_selected = false;
    a.product_options = [];
    a.image_names = ['070_1.jpg', '070_2.jpg', '070_3.jpg'];
    anlegungen.push(a);
    a = new Anlegung();
    a.id = '050';
    a.label = 'Buntbrache';
    a.description = '';
    a.is_selected = false;
    a.image_names = ['050_1.jpg', '050_2.jpg', '050_3.jpg'];
    a.product_options = [];
    anlegungen.push(a);
    a = new Anlegung();
    a.id = '060';
    a.label = 'Saum auf Ackerfläche mit regionalem Saatgut';
    a.description = '';
    a.is_selected = false;
    a.image_names = ['060_1.jpg', '060_2.jpg', '060_3.jpg'];
    a.product_options = [];
    anlegungen.push(a);
    return of(anlegungen);
  }
}
