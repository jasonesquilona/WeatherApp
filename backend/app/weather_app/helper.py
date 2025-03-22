import pandas as pd
import openmeteo_requests

import requests_cache
from retry_requests import retry

def callApi(params):
    url = "https://api.open-meteo.com/v1/forecast"
    cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
    retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
    openmeteo = openmeteo_requests.Client(session = retry_session)

    responses = openmeteo.weather_api(url, params = params)
    response = responses[0]
    return response