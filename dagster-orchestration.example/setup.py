from setuptools import find_packages, setup

setup(
    name="dagster_orchestration",
    packages=find_packages(exclude=["dagster_orchestration_tests"]),
    install_requires=[
        "dagster",
        "requests",
        "pandas",
        "matplotlib",
        "dagster-duckdb",
        "dagster_duckdb_pandas"
    ],
    extras_require={"dev": ["dagster-webserver", "pytest"]},
)
