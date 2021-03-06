require 'octokit'
require 'netrc'
require 'json'

module Jekyll

	# used to generate open source projects
	class OpenSourceProjectTag < Liquid::Tag

		def initialize(tag, params, tokens)
			super
			@params = params
		end

		def look_up(context, name)
			lookup = context

			name.split(".").each do |value|
				lookup = lookup[value]
			end

			lookup
		end

		def str_safe_compare(a, b)
			return a.downcase == b.downcase
		end

		def render(context)
			renderContent = ""
			
			arguments = @params.split(' ')

			_type = arguments[0]
			_host = look_up(context, arguments[1])
			_id = look_up(context, arguments[2])
			_languages = look_up(context, arguments[3])
			_active = look_up(context, arguments[4])
			_showStats = look_up(context, arguments[5])
			_name = look_up(context, arguments[6])
			_website = look_up(context, arguments[7])

			_title = _name
			_description = nil
			_forks = '?'
			_stars = '?'

			if _type != "preview" || _active == true
				if _type == "preview"
					_class = "project-preview"
				else
					_type = look_up(context, _type)
					_class = "project-portfolio project-#{_type}"
				end

				if _host == "GitHub"
					if _website == nil
						_website = "https://github.com/#{_id}"
					end

					_client = Octokit::Client.new(:netrc => true, auto_traversal: true)
					_user = _client.user
					_user.login

					_gitInfo = _id.split('/')
					_repoName = _gitInfo[1]

					if str_safe_compare(_gitInfo[0], "glendc")
						_client.repos.each do |repo|
	    					if str_safe_compare(repo.name, _repoName)
	    						if _title == nil
	    							_title = repo.name if repo.name
	    						end
	    						_description = repo.description if repo.description
	    						_forks = repo.forks_count if repo.forks_count
	    						_stars = repo.stargazers_count if repo.stargazers_count
	    					end
	    				end
					else
						repo = _client.repo "#{_id}"
						if repo
    						if _title == nil
    							_title = repo.name if repo.name
    						end
	    					_description = repo.description if repo.description
	    					_forks = repo.forks_count if repo.forks_count
	    					_stars = repo.stargazers_count if repo.stargazers_count
						end
					end

    				# todo: get this from Octokit if I ever figure out how...
    				_languages = _languages.split(',')
				end
				
				renderContent = "<div class=\"#{_class}\">" <<
					"<a href=\"#{_website}\" title=\"Checkout #{_title} on #{_host}!\">" <<
					"<div class=\"header\">" <<
					"<div class=\"header-content\">" <<
					"> #{_title}" <<
					"</div>" <<
					"<div class=\"header-host\">@ #{_host}</div>" <<
					"<div class=\"clear\"></div>" <<
					"</div>" <<
					"</a>" <<
					"<div class=\"content\">#{_description}</div>" <<
					"<div class=\"footer\">"

				_languages.each do |language|
					renderContent << "<div class=\"language\">#{language}</div>"
				end

				if _host == "GitHub" and _showStats
					renderContent << "<div class=\"community\">" <<
						"<a href=\"#{_website}\"><div class=\"stars\" title=\"Star on #{_host}!\"><p>#{_stars}</p></div></a>" <<
						"<a href=\"#{_website}\"><div class=\"forks\" title=\"Fork on #{_host}!\"><p>#{_forks}</p></div></a>" <<
						"</div>"
				end
				
				renderContent << "</div></div>"
			end

			renderContent
		end

	end

end

Liquid::Template.register_tag('open_source_project', Jekyll::OpenSourceProjectTag)