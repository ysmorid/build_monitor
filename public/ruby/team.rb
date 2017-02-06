require 'chicanery/cctray'
require 'json'
require_relative 'Common'
include Common

include Chicanery::Cctray

unless ARGV.empty?
	cctray 'go', ARGV[0]
	persist_state_to 'state'

	when_run do |state|
	    PIPELINEMAPS.each do |name, map|
		    pipelines = collapse_jobs_to_pipelines state[:servers]["go"], map
		    builds = get_builds pipelines
		    save_file(Common::DATA_DIR + ARGV[1] + ".json", builds.to_json)
		end
	end
end
