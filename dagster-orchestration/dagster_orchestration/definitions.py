from dagster import (
    AssetSelection,
    Definitions,
    ScheduleDefinition,
    define_asset_job,
    load_assets_from_modules,
)
from dagster_duckdb_pandas import DuckDBPandasIOManager

from dagster_orchestration.assets import duck
from .assets import pipelineone


duck_assets = load_assets_from_modules([duck])
pipelineone_assets = load_assets_from_modules([pipelineone])

# define the job that will materialize the assets
pandas_job = define_asset_job("pandas_job", selection=AssetSelection.all())

pipelineone_job = define_asset_job(
    name="pipeline_one_job", 
    selection=AssetSelection.all()
)

# a ScheduleDefinition the job it should run and a cron schedule of how frequently to run it
pandas_schedule = ScheduleDefinition(
    job=pandas_job, cron_schedule="0 0 * * *"  # every day at midnight
)
pipelineone_schedule = ScheduleDefinition(
    job=pipelineone_job, cron_schedule="0 0 * * *"  # every day at midnight
)

database_io_manager = DuckDBPandasIOManager(database="analytics.pandas_releases")

defs = Definitions(
    assets=[*duck_assets,*pipelineone_assets],
    schedules=[pandas_schedule,pipelineone_schedule],
    resources={
        "io_manager": database_io_manager,
    },
)
