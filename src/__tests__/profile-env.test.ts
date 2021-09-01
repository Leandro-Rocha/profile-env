import { getProperty, requireProperty } from '../profile-env'

beforeEach(() => {
    delete process.env.PROFILE
    delete process.env.PROP1
    delete process.env.PROP2
})
test('cant find required', () => {
    expect(() => requireProperty('NO_PROP')).toThrowError('Environment property NO_PROP is not set')
})

test('no profile', () => {
    delete process.env.PROFILE
    process.env.PROP1 = 'prop1'
    delete process.env.PROP2

    const propertyValue = requireProperty('PROP1')
    expect(propertyValue).toBe('prop1')

    const notRequired = getProperty('PROP2')
    expect(notRequired).toBeUndefined()

    const notRequiredDefault = getProperty('PROP2', 'default2')
    expect(notRequiredDefault).toBe('default2')
})

test('no profile property', () => {
    process.env.PROP1 = 'prop1'
    process.env.TEST_PROP1 = 'test_prop1'
    process.env.DEV_PROP1 = 'dev_prop1'

    delete process.env.PROFILE
    let propertyValue = requireProperty('PROP1')
    expect(propertyValue).toBe('prop1')

    process.env.PROFILE = 'DONT_EXISTS'
    propertyValue = requireProperty('PROP1')
    expect(propertyValue).toBe('prop1')

    process.env.PROFILE = 'TEST'
    propertyValue = requireProperty('PROP1')
    expect(propertyValue).toBe('test_prop1')

    process.env.PROFILE = 'DEV'
    propertyValue = requireProperty('PROP1')
    expect(propertyValue).toBe('dev_prop1')
})
