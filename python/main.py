import pandas as pd
from linkedin_scraper1 import get_jobs_linkedin1
from gupy_scraper import get_jobs_gupy
import json
import multiprocessing


def func(arg):
    idx, row = arg
    company_dict = {
        "companyName": row.companyName,
        "investors": [row["VC"]],
        "companyInfo": row.companyInfo,
        "companyUrl": row.companyUrl,
        "jobsUrl": row.jobsUrl,
        "source": row.source,
        "logo": row.companyLogo,
        "companyUrl": row.companyUrl,
    }

    jobs_list = []

    if row.source == "linkedin1":
        try:
            jobs_list = get_jobs_linkedin1(row.jobsUrl)
        except Exception as e:
            print(row.companyName, row.source, "Error: ", e)
    elif row.source == "gupy":
        try:
            jobs_list = get_jobs_gupy(row.jobsUrl)
        except Exception as e:
            print(row.companyName, row.source, "Error: ", e)

    company_dict["jobsList"] = jobs_list

    return company_dict


if __name__ == "__main__":
    n_processes = multiprocessing.cpu_count()
    pool = multiprocessing.Pool(processes=n_processes)

    df = pd.read_excel("./python/startup_jobs.xlsx").fillna("")

    df_gupy = df[df.source == "gupy"]
    df_linkedin1 = df[df.source == "linkedin1"]

    companies_list = []
    jobs_list = []
    startups = pool.map(func, [(idx, row) for idx, row in df.iterrows()])

    for startup in startups:
        company_name = startup["companyName"]
        if not next(
            (sub for sub in companies_list if sub["companyName"] == company_name), None
        ):
            companies_list.append(startup)

        for job in startup["jobsList"]:
            jobs_list.append(
                {
                    "investors": startup["investors"],
                    "companyName": company_name,
                    "companyInfo": startup["companyInfo"],
                    "companyUrl": startup["companyUrl"],
                    "jobsUrl": startup["jobsUrl"],
                    "source": startup["source"],
                    "logo": startup["logo"],
                    "position": job["position"],
                    "location": job["location"],
                    "url": job["url"],
                    "level": job["level"],
                }
            )

    with open("./json/startups.json", "w") as outfile:
        json.dump(
            sorted(companies_list, key=lambda d: (d["companyName"])),
            outfile,
            ensure_ascii=False,
        )

    with open("./json/jobs.json", "w") as outfile:
        json.dump(
            sorted(jobs_list, key=lambda d: (d["companyName"], d["position"])),
            outfile,
            ensure_ascii=False,
        )
