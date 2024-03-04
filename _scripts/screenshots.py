from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import requests, yaml, os, re, time
from urllib.parse import urlparse

def fetch_og_meta(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        og_image = soup.find('meta', property='og:image')
        return og_image['content'] if og_image else None
    except Exception as e:
        print(f"Error fetching OG meta for {url}: {e}")
        return None

def generate_filename(url, suffix, extension=".png"):
    domain = urlparse(url).netloc.replace('www.', '').replace('.com', '').replace('.org', '').replace('.net', '')
    sanitized_domain = re.sub(r'\W+', '_', domain)
    filename = f"{sanitized_domain}_{suffix}{extension}"
    return os.path.join(screenshot_dir, filename)

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("window-size=390,300")
driver = webdriver.Chrome(options=options)

with open('_data/redirects.yml', 'r') as file:
    redirects = yaml.safe_load(file)

screenshot_dir = 'screenshots'
os.makedirs(screenshot_dir, exist_ok=True)

for entry in redirects:
    url = entry.get('url')
    print(f"Processing {url}")

    # Use existing OG image if present, fetch otherwise
    og_image = entry.get('og:image') if 'og:image' in entry else fetch_og_meta(url)
    entry['og:image'] = og_image  # Update the entry with the fetched OG image or None

    screenshot_filename = generate_filename(url, 'screenshot')
    screenshot_path = screenshot_filename

    # Generate screenshot if not exists or OG image is None
    if not os.path.exists(screenshot_path) or og_image is None:
        driver.get(url)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        time.sleep(2)  # Allow time for animations
        driver.save_screenshot(screenshot_path)
        print(f"Screenshot saved: {screenshot_path}")

    # Decide which image to use: OG image if available; otherwise, use the screenshot
    entry['image'] = og_image if og_image else screenshot_path

driver.quit()

# Write the updated data back to the original YAML file
with open('_data/redirects.yml', 'w') as file:
    yaml.dump(redirects, file, allow_unicode=True)
print("Redirects with images updated in _data/redirects.yml.")
