import openmeteo_requests

import requests_cache
import pandas as pd
from retry_requests import retry

def callApi(params):
    url = "https://api.open-meteo.com/v1/forecast"
    cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
    retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
    openmeteo = openmeteo_requests.Client(session = retry_session)

    responses = openmeteo.weather_api(url, params = params)