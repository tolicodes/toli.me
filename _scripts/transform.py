import yaml
from collections import defaultdict

# Load the original YAML data
with open('_data/redirects.yml', 'r') as file:
    original_data = yaml.safe_load(file)

redirects_data = []
metadata_data = []
categories_data = defaultdict(list)

for entry in original_data:
    # Split data into redirects and metadata
    redirect_entry = {k: entry[k] for k in ('title', 'url', 'short', 'description', 'category') if k in entry}
    metadata_entry = {k: entry[k] for k in entry if k not in redirect_entry}
    metadata_entry['short'] = entry['short']  # Ensure 'short' is included for linkage

    redirects_data.append(redirect_entry)
    metadata_data.append(metadata_entry)

    # Organize by category
    categories_data[entry.get('category', 'Uncategorized')].append(redirect_entry)

# Save the redirects and metadata to separate YAML files
with open('redirects.yml', 'w') as file:
    yaml.dump(redirects_data, file, allow_unicode=True)

with open('metadata.yml', 'w') as file:
    yaml.dump(metadata_data, file, allow_unicode=True)

# Convert the defaultdict to a regular dict for YAML dumping
categories_data = dict(categories_data)

# Save the categorized data
with open('categories.yml', 'w') as file:
    yaml.dump(categories_data, file, allow_unicode=True)
