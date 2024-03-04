from selenium import webdriver
import yaml
import os

# Load the YAML file
with open('_data/redirects.yml', 'r') as file:
    redirects = yaml.safe_load(file)

# Setup Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # Run Chrome in headless mode (without UI)
driver = webdriver.Chrome(options=options)

# Ensure the screenshots directory exists
screenshot_dir = '_data/screenshots'
os.makedirs(screenshot_dir, exist_ok=True)

# Iterate over the URLs and take screenshots
for entry in redirects:
    try:
        url = entry['url']
        driver.get(url)

        # Define the screenshot filename (you might want to use a more sophisticated naming scheme)
        filename = os.path.join(screenshot_dir, f"{entry['title'].replace(' ', '_')}.png")

        # Take the screenshot
        driver.save_screenshot(filename)
        print(f"Saved screenshot for {url} as {filename}")
    except Exception as e:
        print(f"Error taking screenshot for {url}: {e}")

# Clean up
driver.quit()
