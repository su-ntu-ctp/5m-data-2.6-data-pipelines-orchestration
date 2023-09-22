# Lesson

## Brief

### Preparation

Create the conda environment based on the `environment.yml` file. We will also be using google cloud (for which the account was created in the previous unit) in this lesson.

### Lesson Overview

Due to the rise of cloud data warehouse, data pipelines and ingestion model has shifted from Extract, Transform and Load (ETL) to Extract, Load and Transform (ELT), as alluded to in the previous unit. We learnt about the _Transform_ part in unit 2.5, as well as the _Extract_ (data extraction and web scraping) in unit 2.4.

In this lesson, we will instead use a framework (and platform) called `Meltano` which handles the end-to-end data pipeline, from **ingestion** (_Extract_ and _Load_), to _Transform_ via `dbt` once the data is loaded into the data warehouse.

We will then use an orchestration framework called `dagster` to orchestrate and schedule the ELT pipeline.

---

## Part 1 - Hands-on with ELT

### Background

In the late 2010s, numerous companies and open-source initiatives emerged to address the challenge of ELT in the burgeoning world of SaaS. They sought to streamline the process of assimilating data from multiple SaaS platforms into a unified warehouse for analysis, mainly for Business Analytics purposes.

A standout open-source solution for ELT was `Singer`. Its core idea was straightforward: you could create any data extraction program, such as a basic Python script using requests, to retrieve data from a source. Similarly, you could design any data loading program to deposit this data into destinations like MySQL, Redshift, Snowflake, Databricks, Azure Synapse, Duck DB, and others. As long as your extraction tool (termed a 'tap') and your loading tool (labeled a 'target') were compliant with the serialized JSON format set by Singer, you could effortlessly transfer the data from the tap to the target using a single command.

Beyond this, the Singer.io framework offered additional functionalities, including the ability to set up a catalog.py to choose the data for replication, a STATE JSON blueprint for retaining details across tap usages, and a configuration file containing essential details like credentials to extract data from the source.

With this standard in place, any data enthusiast could contribute a tap or target to the shared open-source repository.

In 2018, the project was rebranded as `Meltano`. Building on the original Singer specification, Meltano added an SDK for building new integrations, a configuration wrapper, and an integrations Hub to support the community of Singer users. At the time of writing, the Meltano Hub offers over 550 integrations.

![meltano](assets/meltano.png)

### Create a Meltano Project

We will create a Meltano project and use it to

1. extract data from Github and load it into a BigQuery dataset.
2. extract data from a Postgres database and load it into a BigQuery dataset.

We will treat the BigQuery dataset as our data warehouse. The 2 tasks above are typical data ingestion pipelines, which extract data from external and internal sources and load them into a data warehouse.

To create a Meltano project, run:

```bash
meltano init meltano-ingestion
cd meltano-ingestion
```

### Add an Extractor to Pull Data from Github

We're going to add an extrator for GitHub to get our data. An extractor is responsible for pulling data out of any data source.
We will use the `tap-github` extractor to pull the _releases_ of `pandas` library from Github. This will be a replication of what we did in unit 2.4.

To add the extractor to our project, run:

```bash
meltano add extractor tap-github
```

Next, configure the extractor by running:

```bash
meltano config tap-github set --interactive
```

You will be prompted to enter many options, we just need to enter the following:

- `auth_token`: `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`
- `repositories`: `["pandas-dev/pandas"]`

This will add the configuration to the `meltano.yml` file, and the secret auth token to the `.env` file.

Now that the extractor has been configured, it'll know where and how to find your data, but won't yet know which specific entities and attributes (tables and columns) you're interested in.

By default, Meltano will instruct extractors to extract all supported entities and attributes, but we're going to select specific ones for this tutorial. Find out what entities and attributes are available:

```bash
meltano select tap-github --list --all
```

If you recall from unit 2.4, we are interested in the `releases` entity, with the following attributes:

- `tag_name`
- `body`
- `published_at`

To select the entities and attributes, run:

```bash
meltano select tap-github releases tag_name
meltano select tap-github releases body
meltano select tap-github releases published_at
```

### Add a Dummy Loader to Dump Data into JSON

We add a JSON target to test our pipeline. The JSON target will dump the data into a JSON file.

```bash
meltano add loader target-jsonl --variant=andyh1203
```

### Test Run Github to JSON

We can now test run the pipeline to see if it works.

```bash
meltano run tap-github target-jsonl
```

The extracted data will be dumped into a JSON file in the `output/` directory.

### Add a Loader to Load Data into BigQuery

Before we can load the data into BigQuery, let's create a new project called `meltano-learn`. Then create a dataset in BigQuery called `ingestion` (multi-region: US).

Finally, create a service account with the `BigQuery Admin` role and download the JSON key file to your local machine.

We will now add a loader to load the data into BigQuery.

```bash
meltano add loader target-bigquery
```

```bash
meltano config target-bigquery set --interactive
```

Set the following options:

- `project`: `meltano-learn`
- `dataset`: `ingestion`
- `credentials_path`: _full path to the service account key file_
- `method`: `batch_job`
- `denormalized`: `true`
- `flattening_enabled`: `true`
- `flattening_max_depth`: `1`

### Run Github to BigQuery

We can now run the full ingestion (extract-load) pipeline.

```bash
meltano run tap-github target-bigquery
```

You will see the logs printed out in your console. Once the pipeline is completed, you can check the data in BigQuery.

### Add an Extractor to Pull Data from Postgres

We will now add an extractor to pull data from a Postgres database. We will use the `tap-postgres` extractor to pull data from a Postgres database hosted on Supabase.

The database `postgres` contains a table `public.resale_flat_prices_from_jan_2017` with the data of resale flat prices based on registration date from Jan-2017 onwards. It is the same data that we used in unit 1.4.

Here are the connection details:

- Host: `db.kjytsuhjlrmjodturbcb.supabase.co`
- Port: `5432`
- Database: `postgres`
- Username: `su_user`
- Password: `MP8EtwVgM7w`

> 1. Inspect the table schema and data using DBeaver.
> 2. Add the `tap-postgres` extractor to the Meltano project.
> 3. Configure the extractor interactively with the connection details above (also set the `filter_schemas`).
> 4. Run the pipeline with the `target-bigquery` loader. (It will take about 25 mins to complete due to the large amount of data.)

### Create dbt project

Let's create a dbt project to transform the data in BigQuery.

First, activate the conda environment from unit 2.5.

```bash
conda activate dwh
```

Then create a new dbt project.

```bash
dbt init resale_flat
```

Fill in the required config details.

### Create source and models

We can start to create the source and models in the dbt project.

> 1. Create a `source.yml` which points to the `ingestion` schema and `resale_flat_prices_from_jan_2017` table.
> 2. Create a `prices.sql` model (materialized table) which selects all columns from the source table, cast the `floor_area_sqm` to numeric, then add a new column `price_per_sqm` which is the `resale_price` divided by `floor_area_sqm`.
> 3. Create a `prices_by_town_type_model.sql` model (materialized table) which selects the `town`, `flat_type` and `flat_model` columns from `prices`, group by them and calculate the average of `floor_area_sqm`, `resale_price` and `price_per_sqm`. Finally, sort by `town`, `flat_type` and `flat_model`.

### Run dbt

Run the dbt project to transform the data.

```bash
dbt run
```

You should see 2 new tables in the `resale_flat` dataset.

---

## Part 2 - Hands-on with Orchestration

Combining the 2 pipelines above, we have an end-to-end ELT (data ingestion and transformation) pipeline. However, we need to run the pipelines manually. In this part, we will use `dagster` to orchestrate the pipelines and schedule them to run periodically.

### Background

`dagster` is a data orchestrator for machine learning, analytics, and ETL. It lets you define pipelines in terms of the data flow between reusable, logical components, then test locally and run anywhere. With a unified view of pipelines and the assets they produce, Dagster can schedule and orchestrate Pandas, Spark, SQL, or anything else that Python can invoke.

We can orchestrate Melatano and dbt pipelines using Dagster. By executing the commands from within Dagster, we get to take full advantage of its capabilities such as scheduling, dependency management, end-to-end testing, partitioning and more.

![dagster](assets/dagster.png)

### Create a Dagster Project

First, reactivate the conda environment.

```bash
conda activate elt
```

We will create a Dagster project and use it to orchestrate the Meltano pipelines.

```bash
dagster project scaffold --name dagster-orchestration
```

Add the `dagster-meltano` library as a required install item in the Dagster project `setup.py`. Then run the following:

```bash
pip install -e ".[dev]"
dagster dev
```

### Using the Dagster-Meltano library

Replace the content of `dagster-orchestration/dagster_orchestration/__init__.py` with the following:

```python
from dagster import Definitions, ScheduleDefinition, job
from dagster_meltano import meltano_resource, meltano_run_op


@job(resource_defs={"meltano": meltano_resource})
def run_elt_job():
   tap_done = meltano_run_op("tap-github target-bigquery")()

# Addition: a ScheduleDefinition the job it should run and a cron schedule of how frequently to run it
elt_schedule = ScheduleDefinition(
    job=run_elt_job,
    cron_schedule="0 0 * * *",  # every day at midnight
)

defs = Definitions(
    schedules=[elt_schedule],
)
```

### Launching a Test Run of the Schedule

Refresh the Dagster project, look for the 'Launchpad' tab after clicking on the job name in the left nav.

When initiating a run in Dagster, we can pass along configuration variables at run time such as the location of the Meltano project:

```yml
resources:
  meltano:
    config:
      project_dir: #full-path-to-the-meltano-project-directory
ops:
  tap_github_target_bigquery:
    config:
      env:
        TAP_GITHUB_AUTH_TOKEN: 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
```

Then click 'Launch run'.

### Using dbt with Dagster

We can also orchestrate dbt with Dagster.

First, activate the conda environment.

```bash
conda activate dwh
```

Create a file named `profiles.yml` in the `resale_flat` dbt project directory with the following content:

```yml
resale_flat:
  outputs:
    dev:
      dataset: resale_flat
      job_execution_timeout_seconds: 300
      job_retries: 1
      keyfile: #full-path-to-the-service-account-key-file
      location: US
      method: service-account
      priority: interactive
      project: meltano-learn
      threads: 1
      type: bigquery
  target: dev
```

Then create a new Dagster project within the same directory.

```bash
dagster-dbt project scaffold --project-name resale_flat_dagster
```

To run the dagster webserver:

```bash
DAGSTER_DBT_PARSE_PROJECT_ON_LOAD=1 dagster dev
```

We can now trigger the dbt pipeline from within Dagster by selecting the assets and clicking 'Materialize selected'.

We can even schedule the dbt pipeline to run daily by uncommenting the code in `resale_flat_dagster/resale_flat_dagster/schedules.py`. Now click 'Reload definitions' and you will see the new schedule.
