import { Component, OnInit } from '@angular/core';
import { Country, Place, PlaceResult } from '../models';
import { EndpointService } from '../services/endpoint.service';
import { GMapsService } from '../services/g-maps.service';
import { UserInput } from '../models/userInput';
import { LatLngLiteral } from '@agm/core/services/google-maps-types';
/**
 * @example This component allows the user to input a hashtag. Once they do, markers will
 *       be placed on the map based on the geo-data attached to tweets that used that hashtag.
 */
@Component({
    selector: 'app-geo-page',
    templateUrl: './geo-page.component.html',
    styleUrls: ['./geo-page.component.scss'],
    providers: [GMapsService]
})
export class GeoPageComponent implements OnInit {
    places: Place[] = undefined;
    latestSearch: string;
    testInput: string;
    latitude = 0;
    longitude = 0;
    zoom = 2;
    loading = false;
    constructor(
        private endpoint: EndpointService,
        private googleMap: GMapsService
    ) {}

    ngOnInit() {}
    /**
     * @example Given a hashtag, this method queries the backend for associated countries and locations.
     *      Once it has those, it will match those places to specific lat/long pairs, and the combination will be used
     *      to create markers in the component template.
     *
     * @param input The submitted value of the geopage's single input element.
     */
    onUserSubmit(input: UserInput) {
        this.latestSearch = input.inputs[0];
        this.places = [];
        this.loading = true;
        this.endpoint
            .searchLocations(this.latestSearch)
            .subscribe((countries: Country[]) => {
                countries.forEach((country: Country, cIndex: number) => {
                    country.places.forEach(
                        (placeResult: PlaceResult, pIndex: number) => {
                            this.googleMap
                                .getLatLongFromAddress(placeResult.name)
                                .subscribe((latLong: LatLngLiteral) => {
                                    const place: Place = {
                                        ...placeResult,
                                        ...latLong
                                    };
                                    this.places.push(place);
                                })
                                .add(() => {
                                    if (
                                        cIndex === countries.length - 1 &&
                                        pIndex === country.places.length - 1
                                    ) {
                                        this.loading = false;
                                    }
                                });
                        }
                    );
                });
                if (!countries.length) {
                    this.loading = false;
                }
            });
    }
}
