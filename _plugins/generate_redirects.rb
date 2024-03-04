Jekyll::Hooks.register :site, :post_write do |site|
    redirects = site.data['redirects']
    redirects.each do |redirect|
      short_path = redirect['short']
      url = redirect['url']
      
      # Handle root redirect separately
      if short_path == "root"
        path = File.join(site.dest, 'index.html')
      else
        path = File.join(site.dest, short_path + '.html')
      end
      
      File.open(path, 'w') do |file|
        file.write("<meta http-equiv='refresh' content='0; URL=#{url}'>")
      end
    end
  end