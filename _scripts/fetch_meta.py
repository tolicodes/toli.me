import requests
from bs4 import BeautifulSoup
import yaml

# Function to fetch meta tags
def fetch_meta_tags(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        title = soup.find('meta', property='og:title')['content'] if soup.find('meta', property='og:title') else None
        description = soup.find('meta', property='og:description')['content'] if soup.find('meta', property='og:description') else None
        image = soup.find('meta', property='og:image')['content'] if soup.find('meta', property='og:image') else None
        return {'title': title, 'description': description, 'image': image}
    else:
        return {'title': None, 'description': None, 'image': None}

# Load existing data
with open('_data/redirects.yml', 'r') as file:
    redirects = yaml.safe_load(file)

# Update each entry with fetched meta tags
for entry in redirects:
    if 'url' in entry:
        meta_tags = fetch_meta_tags(entry['url'])
        entry.update(meta_tags)

# Save the updated data back to the YAML file
with open('_data/redirects_updated.yml', 'w') as file:
    yaml.dump(redirects, file, allow_unicode=True)
