import requests
params = (
('arg', ['bafybeifcdyrhtygr4tvwcqtddgrkvdjpmtoyv2wfdmao6nxc6xqfuzl6ty','bafybeigoervoim3yagf6s662icbu55cetfbnan3lofq2nhxcxvpwk3xsoy']),
)
response = requests.post('https://ipfs.infura.io:5001/api/v0/pin/add', params=params, auth=('2ENUYWivqgqAv14SqSadeLrWeeM','653097382e9417be159500289b383818'))
print(response.json())