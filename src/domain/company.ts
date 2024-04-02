import { v4 as uuidv4 } from 'uuid';

/**
 * Entity representing a company.
 */
export class Company {
    identifier: string;
    name: string;
    cif: CIF;

    constructor (name: string, cif: string, identifier?: string) {
        this.name = name;
        this.cif = new CIF(cif);
        this.identifier = identifier ?? uuidv4();
    }
}

/**
 * Value object for a CIF value.
 */
class CIF {
    readonly value: string;
    private readonly requiredLength = 9;

    constructor (value: string) {
        this.validate(value);
        this.value = value;
    }

    private validate (value: string): void {
        if (value.length !== this.requiredLength) {
            throw new Error(
                `CIF value must be ${this.requiredLength} character length`
            );
        }
    }
}
