import unittest

from CallWeatherAPI import callApi

class TestWeatherAPI(unittest.TestCase):

    def test_call(self):
        params = {
            "latitude" : 49.2497,
            "longitude": -123.1193,
            "hourly": "temperature_2m"
        }
        result = callApi(params)
        self.assertTrue(abs(result.Latitude()-49.2497) <= max(1e-02 * max(abs(result.Latitude()), abs(49.2497)), 0.0))
        
if __name__ == '__main__':
    unittest.main()