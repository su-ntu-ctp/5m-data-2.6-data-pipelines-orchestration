
import base64
from io import BytesIO
from typing import Dict

import matplotlib.pyplot as plt
import pandas as pd
import requests
from dagster import AssetExecutionContext, MetadataValue, asset


@asset
def pandas_releases(
    context: AssetExecutionContext,
) -> pd.DataFrame:
    access_token = "" # add your token here
    response = requests.get(
        "https://api.github.com/repos/pandas-dev/pandas/releases?per_page=100",
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": f"Bearer {access_token}",
        },
    )

    releases_with_essential_fields = [
        {
            "version": release["tag_name"],
            "published_at": release["published_at"],
            "summary": release["body"],
        }
        for release in response.json()
    ]
    df = pd.DataFrame(releases_with_essential_fields)
    df["published_at"] = pd.to_datetime(df["published_at"])

    context.add_output_metadata(
        metadata={
            "num_records": len(df),
            "preview": MetadataValue.md(
                df.sort_values("published_at", ascending=False).head().to_markdown()
            ),
        }
    )

    return df  # return df and the I/O manager will save it


@asset
def summary_statistics(
    context: AssetExecutionContext,
    pandas_releases: pd.DataFrame,
) -> pd.DataFrame:
    counts = {
        "new_features": pandas_releases.summary.str.contains("feature").sum(),
        "bug_fixes": pandas_releases.summary.str.contains("bug").sum(),
        "performance_improvements": pandas_releases.summary.str.contains(
            "performance"
        ).sum(),
    }

    plt.figure(figsize=(10, 6))
    plt.bar(list(counts.keys()), list(counts.values()))
    plt.xticks(rotation=45, ha="right")
    plt.title("Count of Releases by Type in Pandas")
    plt.tight_layout()

    buffer = BytesIO()
    plt.savefig(buffer, format="png")
    image_data = base64.b64encode(buffer.getvalue())

    md_content = f"![img](data:image/png;base64,{image_data.decode()})"

    context.add_output_metadata(metadata={"plot": MetadataValue.md(md_content)})

    return pd.DataFrame(
        {"type": counts.keys(), "count": counts.values()}
    )  # return df and the I/O manager will save it