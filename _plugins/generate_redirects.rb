Jekyll::Hooks.register :site, :post_write do |site|
  # Assuming 'categories' is the file name of your categories YAML in the _data folder
  site.data['categories'].each_value do |entries| # Iterate through each list of entries in categories
    entries.each do |entry|
      # Construct the file path using 'short' for the filename
      path = File.join(site.dest, entry['short'] + '.html')
      url = entry['url']
      
      # Write the redirect HTML file
      File.open(path, 'w') do |file|
        file.write("<meta http-equiv='refresh' content='0; URL=#{url}'>")
      end
    end
  end
end
