import re
import json

# Read data from the text file
with open("text.txt", 'r', encoding='utf-8') as file:
    html_data = file.read()

# Define a regular expression pattern to extract information
pattern = re.compile(r'<td align="center">(\d+)</td>\s+<td align="left"><a href="(.*?)" data-lity>(.*?)</a></td>\s+<td align="center">(.*?)</td>\s+<td align="center">(.*?)</td>')

# Find all matches in the HTML data
matches = pattern.findall(html_data)

# Convert matches to a list of dictionaries
data = []
for match in matches:
    item = {
        "id": int(match[0]),
        "videolink": match[1],
        "name": match[2],
        "category": match[3],
        "difficulty": match[4]
    }
    data.append(item)

# Specify the file path
json_file_path = "extracted_data.json"

# Save data to JSON file with ensure_ascii set to False
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=2, ensure_ascii=False)

print(f"Data has been stored in {json_file_path}")
