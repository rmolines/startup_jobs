import requests
from bs4 import BeautifulSoup


def get_jobs_gupy(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    jobs_list = []
    jobs = soup.find("ul").find_all("li")

    for job in jobs:
        info = job.find("div").find_all("div")

        position = info[0].text
        location = info[1].text
        url = job.a.get("href")
        level = info[2].text

        jobs_list.append(
            {"position": position, "location": location, "url": url, "level": level}
        )

    return jobs_list
