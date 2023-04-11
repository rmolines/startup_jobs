import requests
from bs4 import BeautifulSoup


def get_jobs_linkedin1(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    jobs_list = []
    jobs = soup.find(class_="jobs-search__results-list").find_all("li")

    for job in jobs:
        position = job.find("h3").text.strip()
        location = job.find(class_="job-search-card__location").text.strip()
        url = job.find("a").get("href")

        jobs_list.append(
            {"position": position, "location": location, "url": url, "level": ""}
        )

    return jobs_list
