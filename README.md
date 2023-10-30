# Aave liquidation wallet finder

* Fetches all the address who supllied wbtc to the Aave V3 by fetching past events till 18436820th block and stores into the database.
* Once the addresses are fetched, using the forked RPC, Aave V3 Pool's ```getUserAccountData``` function is called and each user's ***health factor, usdAmountAtRisk, usdAmountEligibleForLiquidation, totalBaseValueProvided*** are stored into the database.
* If ***1 < healthFactor < 1.5***, then the ```usdAmountAtRisk = totalBaseValueProvided * (Liquidaton Close Factor)``` risk of asset liquidation.
* If ***0.95(CLOSE_FACTOR_HF_THRESHOLD) < healthFactor < 1***, then  ```usdAmountEligibleForLiquidation = (totalBaseValueProvided)*(50%)``` 50% of initial supplied assets can get liquidated.
* If ***healthFactor < 0.95(CLOSE_FACTOR_HF_THRESHOLD)***, then  ```usdAmountEligibleForLiquidation = (totalBaseValueProvided)``` all the supplied assets can get liquidated.


## API Reference

#### Get all Users

```http
  GET localhost:9000/v1/users/getAllUsers
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | Returns all users who supplied wbtc to the Aave V3 Pool |

#### Get Users who are at liquidation risk

```http
  GET localhost:9000/v1/users/getUsersAtRisk
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | Returns all users whose health factor is between 1-1.5 and are at the risk of liquidation |

#### Get Users who are eligible for liquidation

```http
  GET localhost:9000/v1/users/getUsersEligibleForLiq
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `-` | `-` | Returns all users whose health factor is below 1 and are eligible for liquidation |





