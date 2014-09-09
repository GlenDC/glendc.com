module Jekyll

	# used to embed videos

	class VideoTag < Liquid::Tag

		def initialize(tag, params, tokens)
			@params = params
			super
		end

		def look_up(context, name)
			lookup = context

			name.split(".").each do |value|
				lookup = lookup[value]
			end

			lookup
		end

		def render(context)
			output = super

			arguments = @params.split(' ')
			
			host = look_up(context, arguments[0])
			id = look_up(context, arguments[1])
			width = arguments[2]
			height = arguments[3]

			if host == "YouTube"
				"<iframe width=\"#{width}\" height=\"#{height}\" src=\"//www.youtube.com/embed/#{id}\" allowfullscreen></iframe>"
			else
				"Error: '#{host}' is an unknown video host!"
			end
		end

	end

end

Liquid::Template.register_tag('video', Jekyll::VideoTag)