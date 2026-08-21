import Ajv from 'ajv';

export class SchemaValidator {

    private ajv: Ajv;

    constructor() {
        this.ajv = new Ajv({
            allErrors: true,
            strict: false
        });
    }

    validate(schema: object, responseBody: unknown): void {

        const validate = this.ajv.compile(schema);

        const valid = validate(responseBody);

        if (!valid) {

            console.error(
                'Schema validation errors:',
                JSON.stringify(validate.errors, null, 2)
            );

            throw new Error(
                `Schema validation failed:\n${JSON.stringify(
                    validate.errors,
                    null,
                    2
                )}`
            );
        }

        console.log('Schema validation passed');
    }
}