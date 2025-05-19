import requests
import json

url = "https://sanchitkumbhar.pythonanywhere.com/api/token/"

payload = json.dumps({
  "email": "tester@eg.com",
  "password": 1234
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
