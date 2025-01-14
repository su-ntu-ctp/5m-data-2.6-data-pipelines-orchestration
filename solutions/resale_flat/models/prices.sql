{{ config(materialized='table') }}

WITH RAW AS (
    SELECT
        month_of_sale,
        town,
        flat_type,
        block,
        street_name,
        storey_range,
        parse_numeric(floor_area_sqm) AS floor_area_sqm,
        flat_model,
        lease_commence_date,
        remaining_lease,
        resale_price
    FROM {{ source('ingestion', 'public_resale_flat_prices_from_jan_2017') }}
)
SELECT
    *,
    resale_price / floor_area_sqm AS price_per_sqm
FROM raw
