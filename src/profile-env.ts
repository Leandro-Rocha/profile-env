export function getProperty(environmentProperty: string, defaultValue?: string) {
    const environment = process.env.PROFILE

    const propertyValue = process.env?.[`${environment}_${environmentProperty}`] || process.env?.[environmentProperty]

    return propertyValue || defaultValue
}

export function requireProperty(environmentProperty: string) {
    const propertyValue = getProperty(environmentProperty)

    if (propertyValue) return propertyValue

    throw new MissingEnvironmentProperty(environmentProperty)
}

export class MissingEnvironmentProperty extends Error {
    constructor(propertyName: string) {
        super(`Environment property ${propertyName} is not set`)
        this.name = this.constructor.name
    }
}
