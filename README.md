## Install Ruby
```sh
# Set Up `rbenv` (if not already set up)
brew install rbenv ruby-build
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.zshrc
echo "export PATH="$HOME/.gem/ruby/$(ruby -e 'print RUBY_VERSION')/bin:$PATH"" >> ~/.zshrc
source ~/.zshrc

# Install a Newer Version of Ruby
rbenv install 3.1.2
rbenv global 3.1.2
```

## Run the site
```sh
gem install --user-install bundler jekyll
sudo bundle install
bundle exec jekyll serve
```

## Resume
Place resume.pdf in /pdf
```
sh ./_scripts/convert_resume.sh
```