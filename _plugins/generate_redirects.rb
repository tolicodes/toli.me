Jekyll::Hooks.register :site, :post_write do |site|
  redirects = site.data['redirects']
  redirects.each do |redirect|
    path = File.join(site.dest, redirect['short'] + '.html')
    url = redirect['url']
    File.open(path, 'w') do |file|
      file.write("<meta http-equiv='refresh' content='0; URL=#{url}'>")
    end
  end
end
