require 'chicanery/cctray'
require 'json'
require_relative 'Common'
include Common

include Chicanery::Cctray

cctray 'go',
  'http://go.twu53team2.freewheelers.bike/go/cctray.xml'

persist_state_to 'state'

when_run do |state|
  PIPELINEMAPS.each do |name, map|
    pipelines = collapse_jobs_to_pipelines state[:servers]["go"], map
    builds = get_builds pipelines
    File.open(Common::DATA_DIR + "A2.json", "w+") {|f| f.puts builds.to_json }
  end
end