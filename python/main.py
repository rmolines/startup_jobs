import pandas as pd
from linkedin_scraper1 import get_jobs_linkedin1
from gupy_scraper import get_jobs_gupy
import json
import multiprocessing


def func(arg):
    idx, row = arg
    company_dict = {}
    company_dict[row.companyName] = {
        "investors": [row["VC"]],
        "companyInfo": row.companyInfo,
        "companyUrl": row.companyUrl,
        "jobsUrl": row.jobsUrl,
        "source": row.source,
        "logo": row.companyLogo,
    }

    company_dict[row.companyName]["companyUrl"] = row.companyUrl

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

    company_dict[row.companyName]["jobsList"] = jobs_list

    return company_dict


if __name__ == "__main__":
    n_processes = multiprocessing.cpu_count()
    pool = multiprocessing.Pool(processes=n_processes)

    df = pd.read_excel("startup_jobs.xlsx").fillna("")

    df_gupy = df[df.source == "gupy"]
    df_linkedin1 = df[df.source == "linkedin1"]

    companies_dict = {}
    startups = pool.map(func, [(idx, row) for idx, row in df.iterrows()])

    for startup in startups:
        company_name = list(startup.keys())[0]
        if company_name not in companies_dict:
            companies_dict[company_name] = startup[company_name]

    with open("./startup_jobs/json/startups.json", "w") as outfile:
        json.dump(companies_dict, outfile, ensure_ascii=False)
