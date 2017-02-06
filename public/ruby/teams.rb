require 'chicanery/cctray'
require 'json'
require_relative 'Common'
include Common

include Chicanery::Cctray

when_run do
  projects = []
  pipelines = get_json(Common::RESOURCE_DIR + 'pipelines.json')

  pipelines.each do |pipeline|
    team_file = "public/ruby/team.rb"
    cctray = pipeline["cctray"]
    pipeline_name = pipeline["pipeline"]

    previousFile = Common::DATA_DIR + pipeline_name + ".json"
    delete_file previousFile

    system "chicanery %s '%s' '%s'" % [team_file, cctray, pipeline_name]

    stages = get_json (Common::DATA_DIR + pipeline_name + '.json')
    projects << create_project_status(pipeline_name, stages);
  end
  save_file(Common::DATA_DIR + "TWU53.json", projects.to_json)
end