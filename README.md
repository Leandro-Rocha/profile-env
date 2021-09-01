# profile-env

---


Have the same environment property name for multiple profiles, like DEV, TEST or PROD, by prepending the PROFILE name to it.

Given your environment properties are like below:

``` properties
PROFILE=TEST
TEST_BOT_TOKEN=test_token
PROD_BOT_TOKEN=prod_token
```

``` js
import { getProperty, requireProperty } from 'profile-env'

getProperty('BOT_TOKEN') // returns 'test_token' as 'PROFILE=TEST'

requireProperty('BOT_TOKEN') // returns 'test_token' as 'PROFILE=TEST'

getProperty('NOT_DEFINED') // Will return undefined as 'NOT_DEFINED' is not in process.env

getProperty('NOT_DEFINED', 'default_value') // Will return 'default_value' as 'NOT_DEFINED' is not in process.env

requireProperty('NOT_DEFINED') // Will throw error as 'NOT_DEFINED' is not in process.env

```
