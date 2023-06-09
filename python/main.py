import pandas as pd
from linkedin_scraper1 import get_jobs_linkedin1
from gupy_scraper import get_jobs_gupy
import json
import multiprocessing
import requests
import os


def func(arg):
    idx, row = arg
    company_dict = {
        "companyName": row.companyName,
        "investors": row["VCList"],
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


def logo_download(arg):
    url = arg[0]
    name = arg[1]

    try:
        logo = "/" + name + ".png"
        if not os.path.isfile("./public/companyLogos" + logo):
            img_data = requests.get(url).content
            with open("./public/companyLogos" + logo, "wb") as handler:
                handler.write(img_data)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    n_processes = multiprocessing.cpu_count()
    pool = multiprocessing.Pool(processes=n_processes)

    df = pd.read_excel("./python/startup_jobs.xlsx").fillna("")
    df = df.join(
        df.groupby("companyName")["VC"].apply(list),
        on="companyName",
        how="left",
        rsuffix="List",
    ).drop_duplicates("companyName")

    df_gupy = df[df.source == "gupy"]
    df_linkedin1 = df[df.source == "linkedin1"]

    companies_list = []
    jobs_list = []
    logos_list = []
    startups = pool.map(func, [(idx, row) for idx, row in df.iterrows()])

    for startup in startups:
        company_name = startup["companyName"]

        logo = None
        if startup["logo"]:
            logo = "/" + company_name + ".png"
            logos_list.append([startup["logo"], company_name])
            startup["logo"] = logo

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
                    "logo": logo,
                    "position": job["position"],
                    "location": job["location"],
                    "url": job["url"],
                    "level": job["level"],
                }
            )

    pool.map(logo_download, logos_list)

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
