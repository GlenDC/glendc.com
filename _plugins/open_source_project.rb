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

		def render(context)
			renderContent = ""
			
			arguments = @params.split(' ')

			_type = arguments[0]
			_host = look_up(context, arguments[1])
			_id = look_up(context, arguments[2])
			_title = look_up(context, arguments[3])
			_description = look_up(context, arguments[4])
			_languages = look_up(context, arguments[5])
			_active = look_up(context, arguments[6])

			if _type != "preview" || _active == true
				if _type == "preview"
					_class = "project-preview"
				else
					_type = look_up(context, _type)
					_class = "project-portfolio project-#{_type}"
				end

				if _host == "GitHub"
					_url = "https://github.com/#{_id}"
				end
				
				renderContent = "<div class=\"#{_class}\">" <<
					"<a href=\"#{_url}\" title=\"Checkout #{_title} on #{_host}!\">" <<
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

				_languages.split(',').each do |language|
					renderContent << "<div class=\"language\">#{language}</div>"
				end

				renderContent << "<div class=\"community\">" <<
					"<a href=\"#share\"><div class=\"stars\" title=\"Star on #{_host}!\"><p>9999</p></div></a>" <<
					"<a href=\"#fork\"><div class=\"forks\" title=\"Fork on #{_host}!\"><p>9999</p></div></a>" <<
					"</div>"
				
				renderContent << "</div></div>"
			end

			renderContent
		end

	end

end

Liquid::Template.register_tag('open_source_project', Jekyll::OpenSourceProjectTag)