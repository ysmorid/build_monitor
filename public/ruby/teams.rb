require 'chicanery/cctray'
require 'json'
require_relative 'Common'
include Common

include Chicanery::Cctray

persist_state_to 'state'

when_run do |state|
  projects = []
  pipelines = get_json(Common::DATA_DIR + 'pipelines.json')

  pipelines.each do |pipeline|
    pipeline_name = pipeline["pipeline"]
    
    stages = get_json (Common::DATA_DIR + pipeline_name + '.json')

    failures = false;
    building = false;
    stages.each do |map|
      map.each do |name, status, activity, label|
        if status == "failure"
          failures = true
        end
        if activity == "building"
          building = true
        end
      end
    end

    projects << {
      "name" => pipeline_name,
      "status" => (failures ? "failed" : "success"),
      "activity" => (building ? "building" : "sleeping"),
      "url" => "#"+ pipeline_name
    }
  end
  save_file(Common::DATA_DIR + "TWU53.json", projects.to_json)
end