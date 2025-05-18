import requests

url = "https://sanchitkumbhar.pythonanywhere.com/api/products"

payload = {'stock': '1000'}
files=[

]
headers = {
  'Content-Type': 'multipart/form-data'
}

response = requests.request("GET", url, headers=headers, data=payload, files=files)

print(response.text)
