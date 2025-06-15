import requests
import json

reqUrl = "https://sanchitkumbhar.pythonanywhere.com/products/"

headersList = {
 "Accept": "*/*",
 "User-Agent": "Thunder Client (https://www.thunderclient.com)",
 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ5MjI4ODkzLCJpYXQiOjE3NDkyMjUyOTMsImp0aSI6Ijg1NDVlOWViYTQ0YjQ2ZjJhMmNmMDZhOGY5Y2Y1ZjNhIiwidXNlcl9pZCI6MjR9.eQZNvH6ZLCD89kOJCgjkD341EvFDl7eeGZ57Bb0Q7PQ",
 "Content-Type": "application/json" 
}

payload = json.dumps({    
    "email": "sanchit@sv.com",
    "password":"1234"
 
  })

response = requests.request("GET", reqUrl, data=payload,  headers=headersList)

print(response.text)