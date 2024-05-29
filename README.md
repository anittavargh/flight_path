# flight_path

Story: There are over 100,000 flights a day, with millions of people and cargo being transferred worldwide. With so many people and different carrier/agency groups, it can be hard to track where a person might be. In order to determine a person's flight path, we must sort through all of their flight records.

Goal: To create a microservice API to help us understand and track how a particular person’s flight path may be queried. The API should accept a request that includes a list of flights defined by a source and destination airport code. These flights may not be listed in order and must be sorted to find the total flight paths starting and ending at airports.

Examples: 
[['SFO', 'EWR']]                                                    => ['SFO', 'EWR']
[['ATL', 'EWR'], ['SFO', 'ATL']]                                    => ['SFO', 'EWR']
[['IND', 'EWR'], ['SFO', 'ATL'], ['GSO', 'IND'], ['ATL', 'GSO']]    => ['SFO', 'EWR']
