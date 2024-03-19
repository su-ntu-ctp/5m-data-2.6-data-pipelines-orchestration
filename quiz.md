# Quiz

### Q1: What is the main purpose of Meltano?

- A. Meltano is a framework for data extraction and loading into a data warehouse.
- B. Meltano is a framework for data transformation after loading into a data warehouse.
- C. Meltano is a framework for end-to-end data pipelines, including data extraction, loading, and transformation.
- D. Meltano is a framework for data orchestration and scheduling.

### Q2: What is the core idea behind the Singer project, which Meltano is built upon?

- A. Creating a standardized format for data extraction and loading programs.
- B. Building a unified data warehouse for all types of data sources.
- C. Developing a framework for data transformation using SQL.
- D. Providing a platform for data orchestration and scheduling.

### Q3: What is the purpose of the `meltano select` command?

- A. To select the data sources for extraction.
- B. To select the entities and attributes (tables and columns) to extract from a data source.
- C. To select the destination for loading the extracted data.
- D. To select the transformation rules for the extracted data.

### Q4: What is the purpose of a Software-Defined Asset (SDA) in Dagster?

- A. It represents a logical unit of data that can be produced or consumed by a pipeline.
- B. It defines the schedule for running a pipeline.
- C. It manages the input and output of data for a pipeline.
- D. It represents a specific data transformation step within a pipeline.

### Q5: What is the purpose of a Job in Dagster?

- A. To define a schedule for running a pipeline.
- B. To target a selection of assets to materialize them together as a single action.
- C. To manage the input and output of data for a pipeline.
- D. To represent a specific data transformation step within a pipeline.

### Q6: What is the purpose of an I/O Manager in Dagster?

- A. To manage how data is read from and written to assets.
- B. To define the schedule for running a pipeline.
- C. To target a selection of assets to materialize them together.
- D. To represent a specific data transformation step within a pipeline.

### Q7: In the lesson, what is the purpose of the `summary_statistics` asset in Dagster?

- A. To make a request to the Github API and retrieve releases data for the pandas library.
- B. To calculate summary statistics for the pandas releases data and generate a bar chart.
- C. To transform the pandas releases data using dbt.
- D. To load the pandas releases data into a data warehouse.

### Q8: What is the purpose of the `Definitions` object in Dagster?

- A. To combine and manage different types of Dagster definitions, such as assets, jobs, and schedules.
- B. To define a schedule for running a pipeline.
- C. To target a selection of assets to materialize them together.
- D. To manage the input and output of data for a pipeline.

### Q9: In the Meltano project, what is the purpose of the `meltano add extractor` command?

- A. To add a new data source for extraction.
- B. To add a new destination for loading the extracted data.
- C. To add a new transformation rule for the extracted data.
- D. To add a new schedule for running the data pipeline.

### Q10: In the Dagster project, what is the purpose of the `ScheduleDefinition`?

- A. To define a schedule for running a job at a specified frequency.
- B. To define a new asset in the project.
- C. To define a job that will materialize a selection of assets.
- D. To define an I/O manager for managing data input and output.
