/**
 * Entity representing a Candidate.
 */
export class Candidate {
    name: string;
    email: Email;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = new Email(email);
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
