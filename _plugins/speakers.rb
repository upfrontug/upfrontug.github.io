module Jekyll
  class SpeakersGenerator < Generator
    safe true
    priority :low

    def generate(site)
      site.data["speakers"] = aggregate_speakers(site)
    end

    private

    def aggregate_speakers(site)
      speakers = {}

      site.posts.docs.each do |post|
        talks = post.data["talks"]
        next unless talks.is_a?(Array)

        talks.each do |talk|
          Array(talk["speakers"]).each do |speaker|
            name = speaker["name"].to_s.strip
            next if name.empty?

            key = normalize_name(name)
            speakers[key] ||= {
              "name" => name,
              "picture" => nil,
              "links" => [],
              "appearances" => []
            }

            speakers[key]["appearances"] << {
              "counter" => post.data["counter"].to_s,
              "date" => post.date,
              "date_label" => post.date.strftime("%a, %b %d %Y"),
              "title" => talk["title"].to_s.strip,
              "url" => post.url
            }

            picture = speaker["picture"].to_s.strip
            speakers[key]["picture"] = picture unless picture.empty?

            links = speaker["links"]
            speakers[key]["links"] = links if links.is_a?(Array) && !links.empty?
          end
        end
      end

      list = speakers.values.map do |speaker|
        speaker["appearances"].sort_by! { |appearance| appearance["date"] }.reverse!
        speaker["appearances"].each { |appearance| appearance.delete("date") }
        speaker
      end

      list
    end

    def normalize_name(name)
      name.downcase.strip.gsub(/\s+/, " ")
    end
  end
end
