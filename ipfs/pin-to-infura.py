import requests
params = (
('arg', ['bafybeia4trxb4z73ihbihn7anxciavkofc5pw4pyq7f2yddf3eaxibip7m','bafybeidru3xvdwstxkp2x5shiwrqoeionzbcrwlzy24vcttrvfmjewworu']),
)
response = requests.post('https://ipfs.infura.io:5001/api/v0/pin/add', params=params, auth=('2ENUYWivqgqAv14SqSadeLrWeeM','653097382e9417be159500289b383818'))
print(response.json())