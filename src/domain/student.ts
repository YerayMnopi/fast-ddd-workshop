import { v4 } from 'uuid';

/**
 * Entity representing a Student.
 */
export class Student {
    identifier: string;
    name: string;
    email: Email;

    constructor(name: string, email: string, identifier: string) {
        this.name = name;
        this.email = new Email(email);
        this.identifier = identifier ?? v4();
    }
}

/**
 * Value object representing an email value.
 */
class Email {
    readonly value: string;
    readonly requiredChars = ['@', '.'];

    constructor(value: string) {
        this.validate(value);
        this.value = value;
    }

    private validate(value: string): void {
        this.requiredChars.forEach((requiredChar) => {
            if (!value.includes(requiredChar)) {
                throw new Error(
                    `Email value must contain ${requiredChar} to be valid`,
                );
            }
        });
    }
}
