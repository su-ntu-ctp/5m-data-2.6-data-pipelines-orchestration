from dagster import asset, AssetExecutionContext
import pandas as pd


@asset
def pipeline_one_asset_a(context: AssetExecutionContext) -> pd.DataFrame:
    df = pd.DataFrame({"variable_1": [1, 2, 3],
                       "variable_2": [4, 5, 6],
                       "variable_3": [7, 8, 9]})
    return df

@asset
def pipeline_one_asset_b(context: AssetExecutionContext, 
                         pipeline_one_asset_a:pd.DataFrame)-> pd.DataFrame:
    print(pipeline_one_asset_a.columns.tolist())
    return pipeline_one_asset_a

@asset
def pipeline_one_asset_c(context: AssetExecutionContext, pipeline_one_asset_b):
    result = sum(pipeline_one_asset_b)
    context.log.info(f"Pipeline one result: {result}")
    return result